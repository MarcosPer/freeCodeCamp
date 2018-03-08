'use strict';

console.log("FreeCodeCamp HeaderParserMicroService");

var express = require('express');
var app = express();

app.get('/whoami', (req, res) => {
  
    res.send({
        'ipaddress':  req.headers['x-forwarded-for'].split(',')[0],
        'language': req.headers["accept-language"].split(',')[0],
        'software': req.headers['user-agent'].split(') ')[0].split(' (')[1]
   });
  
});
app.get('/', (req,res) => {
  res.send("Please, add /whoami to end of url");
});

app.listen(process.env.PORT);