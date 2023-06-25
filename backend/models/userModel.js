const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

// static signup method
userSchema.statics.signup = async function(email, password) {
    // checks that fields are filled
    if (!email || !password) {
        throw Error('All fields must be filled')
    }

    // checks if email is already used
    const exists = await this.findOne({ email })

    if (exists) {
        throw Error('Email already in use')
    }

    const user = await this.create({ email, password })

    return user
}

// static login method
userSchema.statics.login = async function(email, password) {
    // checks that fields are filled
    if (!email || !password) {
        throw Error('All fields must be filled')
    }

    // checks if user is already signed up
    const user = await this.findOne({ email })

    if (!user) {
        throw Error('Incorrect email/ email not signed up')
    }

    // checks that password entered matches the password in the database
    if (user.password !== password) {
        throw Error('Password incorrect')
    }

    return user
}

module.exports = mongoose.model('User', userSchema)
