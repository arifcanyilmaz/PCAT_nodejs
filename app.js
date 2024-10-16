const path = require('path') //Dosya yolunu belirtir. (CORE)
const exp = require('constants'); //Node.js'teki sabitlere erişmek için (CORE)
const fs = require('fs')

const ejs = require('ejs') //Gömülü js dosyaları (NPM) 
const express = require("express"); // Express (NPM)
const mongoose = require('mongoose') // Mongoose (NPM)
const fileUpload = require('express-fileupload') // Express-FileUpload (NPM)

const Photo = require('./models/Photo') //photo modelimizi import ettik.



const app = express();

// connect DB
mongoose.connect('mongodb://localhost/pcat-db')
    .then(() => console.log('veritabanına bağlandı'))


//TEMPLATE ENGINE
app.set("view engine", "ejs") 

// MIDDLEWARES
app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(fileUpload())

//ROUTES
app.get("/", async (req, res) => {
    const photos = await Photo.find({}).sort('-dateCreated')
    res.render("index", {
        photos
    })
});
app.get("/photos/:id", async (req, res) => {
    const photo = await Photo.findById(req.params.id)
    res.render("photo", {
        photo
    })
});
app.get("/about", (req, res) => {
    res.render("about")
});
app.get("/add", (req, res) => {
    res.render("add")
});

app.post('/photos', async (req, res) => {
  const uploadDir = 'public/uploads'

  if(!fs.existsSync(uploadDir)){
    fs.mkdirSync(uploadDir)
  }
  let uploadeImage = req.files.image;
  let uploadPath = __dirname + '/public/uploads/' + uploadeImage.name;

  uploadeImage.mv(uploadPath, async () => {
    await Photo.create({
      ...req.body,
      image: '/uploads/' + uploadeImage.name,
    });
    res.redirect('/');
  });
});


const port = 3000;
app.listen(port, () => {
  console.log(`Sunucu ${3000}'de baslatildi...`);
});