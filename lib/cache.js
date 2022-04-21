import Redis from 'ioredis'

const redis = new Redis(process.env.REDIS_URL);

function saveCacheData(key, data, expire_in) {
    redis.set(key, data, "EX", expire_in);
}
async function readCacheData(key) {
    try {
        let cache = JSON.parse(await redis.get(key));
        if (cache) return cache
        return null
    } catch (err) {
        return null
    }
}

export {saveCacheData, readCacheData}
