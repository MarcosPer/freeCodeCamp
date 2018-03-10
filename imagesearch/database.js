const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const config = require("../config.json");

exports.history = mongoose.model("imagesearch_history",Schema({
    term : { type:String },
    date : { type: Date , default: Date.now() }
}));

exports.connect = () => {
    var MONGODB_URI = 'mongodb://'+config.mongodb.user+':'+config.mongodb.password+'@'+config.mongodb.host+':'+config.mongodb.port+'/'+config.mongodb.db;
    mongoose.connect(MONGODB_URI,{}, (err) => {
        if(err) {
            console.log(`MongoDB: ${err}`);
            process.exit();
        }else{
            console.log(`MongoDB connected to: ${config.mongodb.host}:${config.mongodb.port}/${config.mongodb.db}`);
        }
    });
}