const mongoose = require('mongoose')

const Schema = mongoose.Schema

const eventSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
    },
    user_id: {
        type: String,
        required: true,
    },
}, {timestamps: true})

module.exports = mongoose.model('Event', eventSchema)