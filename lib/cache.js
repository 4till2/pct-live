import moment from "moment";
import fs from "fs";
import {join} from "path";

const cacheDirectory = join(process.cwd(), "cache");

function saveCacheData(key, data, expire_in) {
    let expire = moment().add(expire_in, 'seconds').toString()
    fs.writeFileSync(`${cacheDirectory}/${key}.json`, JSON.stringify({data: data, expire: expire}));
}

function readCacheData(key) {
    try {
        let cache = fs.readFileSync(`${cacheDirectory}/${key}.json`)
        cache = JSON.parse(cache)
        if (cache && moment().isBefore(moment(cache.expire))) return cache.data
        return null
    } catch (err) {
        return null
    }
}

export {saveCacheData, readCacheData}
