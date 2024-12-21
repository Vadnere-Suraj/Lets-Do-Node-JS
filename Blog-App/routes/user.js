const {Router} = require('express')
const router = Router()
const User = require('../models/user')
const blog = require('../models/blog')

router.get("/signup", (req, res) => {
    if (req.user) {
        return res.redirect("/")
      }
    return res.render("signup")
})

router.get("/signin", (req, res) => {
    if (req.user) {
        return res.redirect("/")
      }
    return res.render("signin")
})


router.post("/signup", async (req, res) => {
    
   const {fullname, email, password} = req.body
    console.log("POST ROUTE CALLED");
    console.log(fullname)
    await User.create({
        fullname : fullname,
        email : email,
        password : password,
    })

    return res.redirect("/user/signin")

})


router.post("/signin", async (req, res) => {
    
    const {email, password} = req.body

    try {
        const token = await User.checkPassword(email, password)
        return res.cookie("token", token).redirect('/')
    } catch (error) {
        return res.render("signin", {
            error: "Invalid email or password"
        })
    }
  
})

router.get("/logout", (req, res) => {
    res.clearCookie("token").redirect("/")
})

router.get("/profile", async (req, res) => {
    if (!req.user) {
        return res.redirect("/")
      }

      const blogs = await blog.find({createdBy: req.user._id})
    return res.render("profile", {
        user : req.user,
        blogs : blogs
    })
})





module.exports = router