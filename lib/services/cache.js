import Redis from 'ioredis'

const redis = new Redis(process.env.REDIS_URL);

function formatKey(key) {
    return process.env.NODE_ENV == "production" ? `prod_${key}` : key
}

function writeCacheData(key, data, expire_in) {
    redis.set(formatKey(key), data, "EX", expire_in);
}

async function readCacheData(key) {
    try {
        let cache = JSON.parse(await redis.get(formatKey(key)));
        if (cache) return cache
        return null
    } catch (err) {
        return null
    }
}

export {writeCacheData, readCacheData}
