const express = require('express')

const {signup, login} = require('../controllers/userController')

const router = express.Router()

// login route
router.post('/login', login)

// sign up route
router.post('/signup', signup)

module.exports = router