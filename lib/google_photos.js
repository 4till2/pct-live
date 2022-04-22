import {google_config} from './google_config.js';
import {readCacheData, writeCacheData} from "./cache";

// TODO: memoize cache requests. Problematic if auth key expires mid call but could save outbound requests

const loadFromAlbumByTitle = async (title) => {
    const id = await getAlbumIdByTitle(title);
    if (!id) return null;

    const photos = await loadFromAlbumById(id)
    return photos
}

const loadFromAlbumById = async (albumId) => {
    const cache_key = `google_album_${albumId}`
    const parameters = {albumId};

    const cached = await readCacheData(cache_key)
    if (cached) return cached;

    const data = await libraryApiSearch(parameters);
    if (data.error) return null

    writeCacheData(cache_key, JSON.stringify(data.photos), 500)
    return data.photos
}

const getAlbumIdByTitle = async (title) => {
    const albums = await getAlbums();
    try {
        const id = albums.filter(a => a.title == title)[0]?.id
        return id
    } catch (error) {
        return null
    }
}

const getAlbums = async () => {
    const cache_key = 'google_albums'
    // Attempt to load the albums from cache if available.
    // Temporarily caching the albums makes the app more responsive.
    const cachedAlbums = await readCacheData(cache_key)
    if (cachedAlbums) {
        console.log('Loaded albums from cache.');
        return (cachedAlbums);
    } else {
        console.log('Loading albums from API.');
        const data = await libraryApiGetAlbums();
        if (data.error) {
            console.error(error)
            return null
        } else {
            writeCacheData(cache_key, JSON.stringify(data.albums), google_config.albumsCacheSeconds)
            return data.albums
        }
    }
}

// Submits a search request to the Google Photos Library API for the given
// parameters. The authToken is used to authenticate requests for the API.
// The minimum number of expected results is configured in config.photosToLoad.
// This function makes multiple calls to the API to load at least as many photos
// as requested. This may result in more items being listed in the response than
// originally requested.
async function libraryApiSearch(parameters) {
    let photos = [];
    let nextPageToken = null;
    let error = null;

    parameters.pageSize = google_config.searchPageSize;

    try {
        // Loop while the number of photos threshold has not been met yet
        // and while there is a nextPageToken to load more items.
        do {
            // Make a POST request to search the library or album
            const searchResponse =
                await fetch(google_config.apiEndpoint + '/v1/mediaItems:search', {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + await authToken() // Function since its possible for the authToken to expire during a looped call.
                    },
                    body: JSON.stringify(parameters)
                });

            const result = await checkStatus(searchResponse);


            // The list of media items returned may be sparse and contain missing
            // elements. Remove all invalid elements.
            // Also remove all elements that are not images by checking its mime type.
            // Media type filters can't be applied if an album is loaded, so an extra
            // filter step is required here to ensure that only images are returned.
            const items = result && result.mediaItems ?
                result.mediaItems
                    .filter(x => x)  // Filter empty or invalid items.
                    // Only keep media items with an image mime type.
                    .filter(x => x.mimeType && x.mimeType.startsWith('image/')) :
                [];

            photos = photos.concat(items);

            // Set the pageToken for the next request.
            parameters.pageToken = result.nextPageToken;

            console.log(
                `Found ${items.length} images in this request. Total images: ${
                    photos.length}`);

            // Loop until the required number of photos has been loaded or until there
            // are no more photos, ie. there is no pageToken.
        } while (photos.length < google_config.photosToLoad &&
        parameters.pageToken != null);

    } catch (err) {
        // Log the error and prepare to return it.
        error = err;
        console.error(error);
    }

    return {photos, parameters, error};
}


// Returns a list of all albums owner by the logged in user from the Library
// API.
async function libraryApiGetAlbums() {
    let albums = [];
    let nextPageToken = null;
    let error = null;

    let parameters = new URLSearchParams();
    parameters.append('pageSize', google_config.albumPageSize);

    try {
        // Loop while there is a nextpageToken property in the response until all
        // albums have been listed.
        do {
            // Make a GET request to load the albums with optional parameters (the
            // pageToken if set).
            const albumResponse = await fetch(google_config.apiEndpoint + '/v1/albums?' + parameters, {
                method: 'get',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + await authToken()
                },
            });

            const result = await checkStatus(albumResponse);

            console.log(`Google Photos albums Response: ${result}`);

            if (result && result.albums) {
                // Parse albums and add them to the list, skipping empty entries.
                const items = result.albums.filter(x => !!x);

                albums = albums.concat(items);
            }
            if (result.nextPageToken) {
                parameters.set('pageToken', result.nextPageToken);
            } else {
                parameters.delete('pageToken');
            }

            // Loop until all albums have been listed and no new nextPageToken is
            // returned.
        } while (parameters.has('pageToken'));

    } catch (err) {
        // Log the error and prepare to return it.
        error = err;
        console.error(error);
    }

    console.info('Albums loaded.');
    return {albums, error};
}

async function authToken() {
    const cache_key = 'google_access_token'

    let cached = await readCacheData(cache_key)
    if (cached) return cached;

    let url = 'https://oauth2.googleapis.com/token'
    let tokenResponse = await fetch(url, {
        method: 'post',
        body: new URLSearchParams({
            refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
            client_id: process.env.GOOGLE_CLIENT_ID,
            client_secret: process.env.GOOGLE_CLIENT_SECRET,
            grant_type: 'refresh_token'
        })
    });
    const result = await checkStatus(tokenResponse);
    if (result) {
        //set cache to access_token for expires_in seconds
        writeCacheData(cache_key, result.access_token, result.expires_in)
        return result.access_token
    }
    return null

}

// Return the body as JSON if the request was successful, or thrown a StatusError.
async function checkStatus(response) {
    if (!response.ok) {
        // Throw a StatusError if a non-OK HTTP status was returned.
        let message = "";
        try {
            // Try to parse the response body as JSON, in case the server returned a useful response.
            message = await response.json();
        } catch (err) {
            // Ignore if no JSON payload was retrieved and use the status text instead.
        }
        throw new StatusError(response.status, response.statusText, message);
    }

    // If the HTTP status is OK, return the body as JSON.
    return await response.json();
}

// Custom error that contains a status, title and a server message.
class StatusError extends Error {
    constructor(status, title, serverMessage, ...params) {
        super(...params)
        this.status = status;
        this.statusTitle = title;
        this.serverMessage = serverMessage;
    }
}


export {loadFromAlbumByTitle}
