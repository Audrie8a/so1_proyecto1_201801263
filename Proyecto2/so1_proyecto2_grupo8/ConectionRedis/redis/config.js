const config = {
    redis: {
        port: 6379,
        host: "34.132.139.168",        
        password: '123',
        database: 0,
        enableReadyCheck: true,
        autoResubscribe: true,
        retryStrategy: times => {
            return Math.min(times * 500, 5000)
        }
    }
}

module.exports = config;