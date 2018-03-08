'use strict';
var express = require('express');
var app = express();
var moment = require('moment');

app.get('/:input', (req, res) => {
  var date = req.params.input
  if(!isNaN(parseInt(date))){
    date = moment(date, "X")
  } else {
    date = moment(date, "MMMM D, YYYY")
  }
  if(date.isValid()){
    res.send({
      unix: date.format("X"),
      natural: date.format("MMMM D, YYYY")
    })
  } else {
    res.send({
      unix: null,
      natural: null
    })
  }
});
app.get('/', (req,res) => {
  res.send("Please, add time");
});

app.listen(process.env.PORT);