In 2022 I hiked the 2650 mile Pacific Crest Trail from the US/Mexico border to US/Canada. In preperation for this trip I built this site as a space to share the journey in its continuum. Start to finish, in real time, with all the possible contexts of the experience itself. To accomplish the sharing of realtime content from my journey I configured it to work automatically in the background of my regular activities. Map 'Waypoints' are fetched from my Garmin tracker, 'Photos' from a Google Photos album, 'Words' my notes app, and 'Logs' the result of a Shortcut on my iPhone. It took a few trys to get right and some things I would do differently moving forward but overall it worked quite well considering I had no access to a computer for 4 months and the site stayed live. 

Known Issues: With the amount of photos and map data points now present the site can be a tad slow on cold start or when the cache is being rebuilt. At times this results in a server timeout while I am on the lowest Vercel tier.


# Environment Variables
**GOOGLE_CLIENT_SECRET** and **GOOGLE_CLIENT_ID**

For accessing google photos. Get them [here](https://console.cloud.google.com/apis/credentials/oauthclient).

**GOOGLE_PHOTOS_REFRESH_TOKEN**

Needed to get a new `access_key` from Google.
To manually retrieve a new one "Use your own credentials" from above in the [Developer Playground](https://developers.google.com/oauthplayground/)


**REDIS_URL**

For Caching.
Using [Upstash](https://console.upstash.com) with a free limit of 10,000 requests per day.
Should be swappable with no consequences.


# Data Sources
When adding a new data source to the site:
1. Create directory for page data in [/data](/data)
3. Add route to [components/sidebar.js](/components/sidebar.js)
4. Add to sitemap and or Rss `getData()` function.

## Photos
Photos are fetched from my Google Photos through their API. This means adding new photos to the site can be done simply by dropping them into the corrosponding album on my phone. Addtionally new Albums can be added to the site by just creating a new file in `data/albums` with the front matter `title: title_of_google_photos_album`

## Logs
Logs are markdown files in the sites `/data/` directory with front matter `publish: true`

## Map
Map waypoints are fetched from my Garmin through their API.
The map tiles are from [maptiler.com](https://maptiler.com).
