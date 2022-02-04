"use strict";

const redisConnection = require("../controllers/redis-connection");
const redis = new redisConnection();

(async () => {
    try {
        let rr = await redis.get("name");
        console.log(rr);
    } catch (error) {
        console.log(`Error al procesar: ${error}`);
    }
})();