const ForumPost = require('../models/forumpostModel')
const FPComment = require('../models/fpCommentModel')
const mongoose = require('mongoose')

// Get all posts
const getAllPosts = async(req, res) => {
    const user_id = req.user._id

    const posts = await ForumPost.find({ /*user_id*/ }).sort({createdAt: -1})

    res.status(200).json(posts)
}

// Get a single post
const getSinglePost = async(req, res) => {

    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such post'})
    }

    const post = await ForumPost.findById(id)

    if (!post) {
        return res.status(404).json({error: 'No such post'})
    }

    res.status(200).json(post)
}

// Create a new post
const createPost = async(req, res) => {
    const {title, description, content} = req.body

    //add new post to database
    try {
        const user_id = req.user._id

        const forumpost = await ForumPost.create({title, content, user_id})
        res.status(200).json(forumpost)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// Delete a post
const deletePost = async (req, res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such post'})
    }

    const post = await ForumPost.findOneAndDelete({_id: id})

    if (!post) {
        return res.status(404).json({error: 'No such post'})
    }

    res.status(200).json(post)
}

// Update a post
const updatePost = async(req, res) => {
    const {id} = req.params
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such post'})
    }

    const post = await ForumPost.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if (!post) {
        return res.status(404).json({error: 'No such post'})
    }

    res.status(200).json(post)
}

// Get all comments
const getAllComments = async(req, res) => {
    const user_id = req.user._id

    const comments = await FPComment.find({ /*user_id*/ }).sort({createdAt: -1})

    res.status(200).json(comments)
}

// Get a single comment
const getSingleComment = async(req, res) => {

    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such comment'})
    }

    const comment = await FPComment.findById(id)

    if (!comment) {
        return res.status(404).json({error: 'No such comment'})
    }

    res.status(200).json(comment)
}

// Create a new comment
const createComment = async(req, res) => {
    const {content} = req.body

    //add new post to database
    try {
        const user_id = req.user._id
        const comment = await FPComment.create({content})
        res.status(200).json(comment)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// Delete a comment
const deleteComment = async (req, res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such comment'})
    }

    const comment = await FPComment.findOneAndDelete({_id: id})

    if (!comment) {
        return res.status(404).json({error: 'No such comment'})
    }

    res.status(200).json(comment)
}

// Update a comment
const updateComment = async(req, res) => {
    const {id} = req.params
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such comment'})
    }

    const comment = await FPComment.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if (!comment) {
        return res.status(404).json({error: 'No such comment'})
    }

    res.status(200).json(comment)
}


module.exports = {
    getAllPosts,
    getSinglePost,
    createPost, 
    deletePost,
    updatePost,
    getAllComments,
    getSingleComment,
    createComment,
    deleteComment,
    updateComment
}