const mongoose = require('mongoose');

const dbConnection = mongoose.createConnection('mongodb://Uso1:123@bases.covidero.ml:27017/so1');

module.exports = {
    dbConnection
};