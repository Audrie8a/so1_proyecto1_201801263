const config = {
    redis: {
        port: 6379,
        host: 'bases.covidero.ml',
        password: '123',
        retries: 3,
        time_to_retry: 100,
        time_live: 5000
    }
}

module.exports = config;