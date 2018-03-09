'use strict';

console.log("FreeCodeCamp FileMetaDataMicroService");

var express = require('express');
var app = express();
var fs = require("fs")
var multer  = require('multer');
var upload = multer({ dest: 'uploads/' });

app.post('/getInfo', upload.single('file'), (req, res) => {
  var file = req.file;
  res.send({ size : file.size, name : file.originalname , extension : file.originalname.split(".")[1], type: file.mimetype});
  fs.unlink(file.path);

});
app.get('/', (req,res) => {
  res.send('<form action="/getInfo" method="post" enctype="multipart/form-data">'+
    '<input type="file" name="file">'+
    '<input type="submit">'+
  '</form>');
});

app.listen(process.env.PORT || 3000);