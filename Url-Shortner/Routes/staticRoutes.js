const express = require('express')
const URL = require('../Models/url')
const { restrictTo } = require('../Middlewares/auth')
const router = express.Router()

router.get('/admin/urls', restrictTo(['ADMIN']),async (req, res) => {

   
    const allurls = await URL.find({})
    
    return res.render("home", {urlss : allurls});
    
})



router.get('/', restrictTo(['NORMAL', 'ADMIN']),async (req, res) => {

   
    const allurls = await URL.find({ createdBy : req.user._id})
    
    return res.render("home", {urlss : allurls});
    
})


router.get('/signup', (req, res) => {
    return res.render("signup");
})


router.get('/login', (req, res) => {
    return res.render("login");
})


module.exports = router;