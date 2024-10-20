const exp = require('constants'); //Node.js'teki sabitlere erişmek için (CORE)

const ejs = require('ejs'); //Gömülü js dosyaları (NPM)
const express = require('express'); // Express (NPM)
const mongoose = require('mongoose'); // Mongoose (NPM)
const fileUpload = require('express-fileupload'); // Express-FileUpload (NPM)
const methodOverride = require('method-override'); // Express-method-override (NPM)

const photoControllers = require('./controllers/photoControllers'); //photo controllersımızı import ettik.
const pageControllers = require('./controllers/pageControllers'); //photo controllersımızı import ettik.

const app = express();

// connect DB
mongoose.connect('mongodb://localhost/pcat-db');

//TEMPLATE ENGINE
app.set('view engine', 'ejs');

// MIDDLEWARES
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileUpload());
app.use(
  methodOverride('_method', {
    methods: ['POST', 'GET'],
  })
);

//ROUTES
app.get('/', photoControllers.getAllPhotos); // Bütün fotoğrafları anasayfaya sıralar.
app.get('/photos/:id', photoControllers.getPhoto); // Fotoğrafın özel sayfasına yönlendirir.
app.put('/photos/:id', photoControllers.updatePhoto); // Fotoğrafın bilgilerini güncelleme kısmı
app.post('/photos', photoControllers.createPhoto); // Fotoğrafı eklediğimiz kısım.
app.delete('/photos/:id', photoControllers.deletePhoto); // Fotoğrafı sildiğimiz kısım.
app.get('/about', pageControllers.getAboutPage); // About sayfasına yönlendirir.
app.get('/add', pageControllers.getAddPage); // Add Photo sayfasına yönlendirir.
app.get('/photo/edit/:id', pageControllers.getPhotoEditPage); // Fotoğrafı editlediğimiz sayfaya yönlendirir.

const port = 3000;
app.listen(port, () => {
  console.log(`Sunucu ${3000}'de baslatildi...`);
});
