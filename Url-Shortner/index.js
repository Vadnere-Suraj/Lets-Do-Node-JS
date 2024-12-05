const express = require('express')
const {connectDB} = require('./connection')
const urlRoute = require('./Routes/url')

const PORT = 8000
const app = express()
connectDB('mongodb://127.0.0.1:27017/url-shortner').then(() => console.log("DB Connected"))
app.use(express.json())
app.use('/url', urlRoute)

app.listen(PORT, () => console.log(`Server started at port no : ${PORT}`))


