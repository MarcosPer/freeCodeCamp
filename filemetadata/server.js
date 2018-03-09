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
    res.sendFile(__dirname + '/form.html');
});

app.listen(process.env.PORT || 3000);