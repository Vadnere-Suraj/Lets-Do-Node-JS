const express = require('express');
const path = require('path');
const app = express();
const PORT = 8000
const userRouter = require('./routes/user')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser');
const { checkAuth } = require('./middlewares/authentication');
const blogRouter = require('./routes/blog');
const blog = require('./models/blog')


app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

mongoose.connect("mongodb://127.0.0.1:27017/blogify").then(() => console.log("DB CONNECTED"))

app.use(cookieParser())
app.use(checkAuth("token"))

app.use(express.urlencoded({extended: false}))
app.use('/user', userRouter)
app.use('/blog', blogRouter)
app.use(express.static(path.resolve('./uploads')))

app.get("/" ,async (req, res) => {
    const blogs = await blog.find({})
    return res.render("home",  {
        user : req.user,
        blogs: blogs
    })
})

app.listen(PORT, () => console.log(`Server Started at port ${PORT}`))