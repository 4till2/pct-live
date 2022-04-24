export const site_config = {}
site_config.timeline_albums = ['Pre Pacific Crest Trail']

export const google_config = {};
// How long to cache results for
google_config.albumsCacheSeconds = 86400; // One day
google_config.photosCacheSeconds = 500; // 5 minutes
// The number of photos to load for search requests.
google_config.photosToLoad = 1000;
// The page size to use for search requests. 100 is reccommended.
google_config.searchPageSize = 100;
// The page size to use for the listing albums request. 50 is reccommended.
google_config.albumPageSize = 50;
// The API end point to use. Do not change.
google_config.apiEndpoint = 'https://photoslibrary.googleapis.com';
