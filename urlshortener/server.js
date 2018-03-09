'use strict';

console.log("FreeCodeCamp UrlShortener");

var express = require('express');
var app = express();
var fs = require("fs")
var db  = require('./database');

var mainURL;

if(process.env.PROJECT_NAME){
    mainURL =  "https://"+process.env.PROJECT_NAME+".glitch.me/";
}else{
    mainURL =  "http://localhost:3000/";
}

db.connect();

app.get('/new/*?', (req,res) => {
    console.log();
    var myUrl = req.params[0];
    if(isURL(myUrl)){
        db.pages.create({ url : myUrl}).then((page) =>{
            res.send({original_url : page.url, short_url : mainURL + page.page_id });
        }).catch((error) => {
            res.status(500).send("Error, server error");
        })
    }else{
      res({error : "invalid url" , url : myUrl})  
    }
});
app.get('/:short', (req, res) => {
    var id = req.params.short;
    console.log(id);

    db.pages.findOne({page_id : id}).then((page) =>{
        //res.send(page.url);
        res.redirect(page.url);
    }).catch((error) => {
        res.status(404).send("Error, page not found")
    });
});


app.listen(process.env.PORT || 3000);


function isURL(url) {
    //https://gist.github.com/dperini/729294
    var regex = /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/i;
    return regex.test(url);
  }
