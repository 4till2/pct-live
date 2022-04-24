## Pages
To create a new Page
1. Create directory for page data in [/data](/data)
2. Copy and adjust a page direcotry (Add page with 
3. Add route to [components/sidebar.js](/components/sidebar.js)
4. 
## Photos
Create a file in `data/albums` with frontmatter`title: google photos album title`


## Environment Variables
**GOOGLE_CLIENT_SECRET** and **GOOGLE_CLIENT_ID**

For accessing google photos. Get them [here](https://console.cloud.google.com/apis/credentials/oauthclient).

**GOOGLE_PHOTOS_REFRESH_TOKEN**

Needed to get a new `access_key` from Google.
To manually retrieve a new one "Use your own credentials" from above in the [Developer Playground](https://developers.google.com/oauthplayground/)


**REDIS_URL**

For Caching.
Using [Upstash](https://console.upstash.com) with a free limit of 10,000 requests per day.
Should be swappable with no consequences.
