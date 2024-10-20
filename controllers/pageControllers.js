const Photo = require('../models/Photo') //photo modelimizi import ettik.
const fs = require('fs') //Dosya İşlemleri. (CORE)
const path = require('path') //Dosya yolunu belirtir. (CORE)

exports.getAboutPage = (req, res) => {
  res.render('about');
};

exports.getAddPage = (req, res) => {
  res.render('add');
};

exports.getPhotoEditPage = async (req, res) => {
  const photo = await Photo.findById({ _id: req.params.id });
  res.render('edit', {
    photo,
  });
};