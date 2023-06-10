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

// const ForumPost = mongoose.model('ForumPost', forumpostSchema);

// const editForumpostSchema = new Schema({
//     title: {
//         type: String,
//         required: true,
//     },
//     content: {
//         type: String,
//         required: true,
//     },
//     user_id: {
//         type: String,
//         required: true,
//     },
// }, {timestamps: true})

// const EditForumPost = mongoose.model('EditForumPost', editForumpostSchema);

module.exports = mongoose.model('ForumPost', forumpostSchema)

// module.exports = {
//     ForumPost: ForumPost,
//     EditForumPost, EditForumPost
// }