require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const userRoutes = require('./routes/user')
const forumpostsRoutes = require('./routes/forumposts')

// express app
const app = express()

// middleware
app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// routes
app.use('/api/user', userRoutes)

app.use('/api/forumposts', forumpostsRoutes)

// connect to database
const URI = `${process.env.MONGO_URI}`;
// console.log(URI);
mongoose.connect(
    URI
).then(() => console.log("MongoDB connected"));


app.get('/', (req, res) => {
    res.send('hello world')
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log("Server is running on port", PORT);
});

