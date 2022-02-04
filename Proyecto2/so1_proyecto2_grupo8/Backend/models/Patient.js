const { Schema } = require("mongoose");
const { dbConnection } = require('../db/config')

const PatientSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    vaccine_type: {
        type: String,
        required: true
    },
    n_dose: {
        type: Number,
        required: true
    }
});

module.exports = dbConnection.model('patient', PatientSchema);