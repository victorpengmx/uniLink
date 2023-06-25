const express = require('express')
const {
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

// GET all comments
router.get('/:id/comments/', getAllComments)

// GET single comment
router.get('/:id/comments/:commentId', getSingleComment)

// POST new comment
router.post('/:id/comments/', createComment)

// DELETE comment
router.delete('/:id/comments/:commentId', deleteComment)

// UPDATE comment
router.patch('/:id/comments/:commentId', updateComment)

module.exports = router
