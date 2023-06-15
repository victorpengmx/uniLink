const mongoose = require('mongoose')

const Schema = mongoose.Schema

const forumpostSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    user_id: {
        type: String,
        required: true,
    },
}, {timestamps: true})

module.exports = mongoose.model('ForumPost', forumpostSchema)
