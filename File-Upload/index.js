const express = require('express');
const app = express();
const path = require('path');
const PORT = 8000;
const multer  = require('multer')




app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'))
app.use(express.urlencoded({extended: false}))

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      return cb(null, './uploads')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now()
      return cb(null, file.fieldname + '-' + uniqueSuffix + file.originalname)
    }
  })

  const upload = multer({ storage: storage })

app.get('/', (req, res) => {
    res.render('home')
})

app.post('/upload', upload.single('profilePic')  , (req, res) => {
    console.log(req.body);
    console.log(req.file);
    return res.redirect('/')
    
})


app.listen(PORT, () => console.log("Server Started"))


