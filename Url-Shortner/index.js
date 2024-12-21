const express = require('express')
const {connectDB} = require('./connection')
const urlRoute = require('./Routes/url')
const staticRoute = require('./Routes/staticRoutes')
const path = require('path')
const userRoute = require('./Routes/user')
const cookieParser = require('cookie-parser')
const {checkForAuthentication, restrictTo} = require('./Middlewares/auth')


const PORT = 8000
const app = express()
connectDB('mongodb://127.0.0.1:27017/url-shortner').then(() => console.log("DB Connected"))
app.set("view engine", 'ejs')
app.set("views", path.resolve('./Views') )


app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cookieParser())
app.use(checkForAuthentication)

app.use('/url',restrictTo(['NORMAL', 'ADMIN']) ,urlRoute)
app.use('/user', userRoute)
app.use('/', staticRoute)
app.listen(PORT, () => console.log(`Server started at port no : ${PORT}`))


