const GoogleImages = require('google-images');
 
const config = require("../config.json");
const client = new GoogleImages(config.googleImages.searchEngine, config.googleImages.APIkey);

const database = require("./database");
database.connect();


var express = require('express');
var app = express();

app.get('/imagesearch/:query', (req, res) => {
    var offset = req.query.offset;
    var searchOptions = {};
    var searchQuery = req.params.query;

    if(offset != undefined){
        searchOptions.page = offset;
    }

    client.search(searchQuery,searchOptions).then((images) => {
        var out = new Array();
        images.forEach((image) => {
            out.push({
                "url" : image.url,
                "snippet" : image.description,
                "thumbnail" : image.thumbnail.url,
                "context" : image.parentPage
            });
        });
        return Promise.resolve(out);
    }).then((result) => {
        res.send(result);
        database.history.create({
            term : searchQuery
        })
    });
});

app.get('/history', (req,res) => {
    database.history.find({}, '-_id term date', {limit: 10, sort: {'date': -1}}).then((results) => {
        res.send(results);
    }).catch((error) => {
        res.send({error : "databaseError"});
    });
});

app.listen(process.env.PORT || 3000);