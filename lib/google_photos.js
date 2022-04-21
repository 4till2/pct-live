import {google_config} from './google_config.js';
import {readCacheData, writeCacheData} from "./cache";

const loadFromAlbum = async (albumId) => {

    console.log(`Importing album: ${albumId}`);

    const parameters = {albumId};

    const cached = await readCacheData(`google_album_${albumId}`)
    if (cached) return cached;

    const data = await libraryApiSearch(parameters);
    if (data.error) return null
    let result = data.photos
    writeCacheData(`google_album_${albumId}`, JSON.stringify(result), 500)
    return result
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

async function authToken() {
    let cached = await readCacheData('google_acccess_token')
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
        writeCacheData('google_acccess_token', result.access_token, result.expires_in)
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


export {loadFromAlbum}
