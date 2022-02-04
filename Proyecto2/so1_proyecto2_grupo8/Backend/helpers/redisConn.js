const redis = require("ioredis");
const config = require("../db/redis");

module.exports = class RedisConnection {
    constructor() {
        this.client = this.connect();
    }

    connect() {
        let client = new redis({
            host: config.redis.host,
            port: config.redis.port,
            password: config.redis.password,
            retryStrategy(times){
                let delay = Math.min(times * config.redis.time_to_retry, 200);
                return delay;
            },
            maxRetriesPerRequest: config.redis.retries
        });

        client.on("connect", () => {
            console.log("Connectado a redis");
        });

        client.on("error", err => {
            console.log(`Redis error: ${err}`);
        });

        return client;
    }

    get(key){
        return this.client.get(key);
    }

    async monitor(callback) {
        return await this.client.monitor(callback);
    }
}