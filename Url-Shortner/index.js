const express = require('express')
const {connectDB} = require('./connection')
const urlRoute = require('./Routes/url')
const staticRoute = require('./Routes/staticRoutes')
const path = require('path')


const PORT = 8000
const app = express()
connectDB('mongodb://127.0.0.1:27017/url-shortner').then(() => console.log("DB Connected"))
app.set("view engine", 'ejs')
app.set("views", path.resolve('./Views') )
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use('/url', urlRoute)
app.use('/',staticRoute)
app.listen(PORT, () => console.log(`Server started at port no : ${PORT}`))


