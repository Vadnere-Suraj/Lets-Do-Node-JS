const {Router} = require('express')
const router = Router()
const multer  = require('multer')
const path = require('path')
const blog = require('../models/blog')
const comment = require("../models/comment")

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.resolve('./uploads/blogAssets'))
    },
    filename: function (req, file, cb) {
      const filename = Date.now() + '-' + file.originalname
      cb(null, filename)
    }
  })

  const upload = multer({ storage: storage })


router.get("/addBlog", (req, res) => {
  if (!req.user) {
    return res.redirect("/")
  }
  
    return res.render("addBlog", {
        user: req.user
    })
})

router.post("/addBlog", upload.single('coverImage') , async (req, res) => {
    const {title,body } = req.body

    

    const b = await blog.create({
        title: title,
        body: body,
        coverImageUrl: `/blogAssets/${req.file.filename}`,
        createdBy: req.user._id,
    })
    
    return res.redirect(`/blog/${b._id}`)
})


router.get("/:id", async (req, res) => {
  const id = req.params.id
  const b = await blog.findById(id).populate("createdBy")
  const comments = await comment.find({blogId : id}).populate("createdBy")

  return res.render("blog", {
    blog : b,
    user: req.user,
    comments: comments
  })
})


router.post("/comment/:id", async (req, res) => {
  const blogid = req.params.id

  await comment.create({
    content: req.body.content,
    createdBy: req.user._id,
    blogId: blogid
  })

  return res.redirect(`/blog/${blogid}`)
})


module.exports = router;