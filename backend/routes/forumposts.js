const express = require('express')
const {
    getAllPosts,
    getSinglePost,
    createPost,
    deletePost,
    updatePost
} = require('../controllers/forumpostController')

const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

// require authentication for all post routes
router.use(requireAuth)

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
