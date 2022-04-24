// const generateRssFeed = require('./build-rss-feed.mjs')
// const generateSiteMap = require('./build-sitemap.mjs')

import {generateSiteMap} from "./build-sitemap.mjs";
import {generateRssFeed} from "./build-rss-feed.mjs";

generateSiteMap()
generateRssFeed()
