const express = require('express')
const {
    getAllPosts,
    getSinglePost,
    createPost,
    deletePost,
    updatePost
} = require('../controllers/forumpostController')


const router = express.Router()

// GET all posts
router.get('/', getAllPosts)

// GET single post
router.get('/:id', getSinglePost)

// POST new post
router.post('/', createPost)

// DELETE post
router.delete('/:id', deletePost)

// UPDATE post
router.patch('/:id', updatePost)


module.exports = router