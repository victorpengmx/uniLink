const mongoose = require('mongoose')

const Schema = mongoose.Schema

const fpCommentSchema = new Schema({
    content: {
        type: String,
        required: true,
    },
}, {timestamps: true})

module.exports = mongoose.model('FPComment', fpCommentSchema)