const express = require('express');
const {connectDB} = require('./connection')
const UserRouter = require('./routes/user')
const app = express();
const reqLog = require('./middlewares/request')


connectDB('mongodb://127.0.0.1:27017/Youtube-App').then(() => console.log("DB Connected Succesfully")).catch(error => console.log(error));




app.use(express.urlencoded({ extended: false }))

app.use(reqLog('./log.txt'))


const PORT = 8000;


app.use('/api/users',UserRouter)





app.listen(PORT, () => console.log(`Server Started at port no : ${PORT}`));