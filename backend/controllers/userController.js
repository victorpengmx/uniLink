const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

// function to create token
const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, { expiresIn: '5d'})
}

// login
const login = async(req, res) => {
    const {email, password} = req.body

    try {
        // adds user to database
        const user = await User.login(email, password)

        // create a token
        const token = createToken(user._id)

        res.status(200).json({email, token})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// signup
const signup = async(req, res) => {
    const {email, password} = req.body

    try {
        // adds user to database
        const user = await User.signup(email, password)

        // create a token
        const token = createToken(user._id)

        res.status(200).json({email, token})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = {signup, login}