const USER = require('../Models/user')
const { v4: uuidv4 } = require('uuid');
const {setUser} = require('../Services/auth')


async function handleUserSignup(req, res){
    const { username, email, password } = req.body;


   await USER.create({
    name: username,
    email: email,
    password: password
   })

   return res.redirect('/')


}


async function handleUserLogin(req, res){
    const { email, password } = req.body;


   const user = await USER.findOne({ email: email, password: password });

   if(!user){
    return res.render('login', {
        error : 'Invalid email or password'
    })
   }

   
   const token =  setUser(user);

   res.cookie('uid', token)

   return res.redirect('/')


}



module.exports = {handleUserSignup, handleUserLogin}