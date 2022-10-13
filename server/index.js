require('dotenv').config()
const express = require('express')
const cors = require('cors')
const {PORT} = process.env
const {sequelize} = require('./util/database')
const {User} = require('./models/user')
const {Post} = require('./models/post')


// importing my functions from other files
const {getAllPosts, getCurrentUserPosts, addPost, editPost, deletePost} = require('./controllers/posts')
const {login, register} = require('./controllers/auth')
const {isAuthenticated} = require('./middleware/isAuthenticated')

const app = express()

app.use(express.json())
app.use(cors())

// setting up relations for sql
User.hasMany(Post)
Post.belongsTo(User)


// endpoints //

app.post(`/register`, register)
app.post(`/login`, login)

app.get(`/posts`, getAllPosts,)
app.get(`/userposts/:userId`, getCurrentUserPosts)

app.post(`/posts`, isAuthenticated, addPost )

app.put(`/posts/:id`, isAuthenticated, editPost )

app.delete(`/posts/:id`, isAuthenticated, deletePost )

sequelize.sync().then(() => {
    
    app.listen(PORT, () => console.log(`listening on port ${PORT}`) )

}).catch((error) => {
    console.log(error)
})


