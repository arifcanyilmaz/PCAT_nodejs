const path = require('path') //Dosya yolunu belirtir. (CORE)
const exp = require('constants'); //Node.js'teki sabitlere erişmek için (CORE)

const ejs = require('ejs') //Gömülü js dosyaları (NPM) 
const express = require("express"); // Express (NPM)
const mongoose = require('mongoose') // Mongoose (NPM)

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

//ROUTES
app.get("/", async (req, res) => {
    const photos = await Photo.find({})
    res.render("index", {
        photos
    })
});
app.get("/about", (req, res) => {
    res.render("about")
});
app.get("/add", (req, res) => {
    res.render("add")
});

app.post("/photos", async (req, res) => {
    await Photo.create(req.body)
    res.redirect('/')
});


const port = 3000;
app.listen(port, () => {
  console.log(`Sunucu ${3000}'de baslatildi...`);
});