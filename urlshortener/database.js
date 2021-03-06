const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const config = require("../config.json");

exports.pages = mongoose.model("urlshortener_pages",Schema({
   // _id: { type: mongoose.Schema.Types.ObjectId, auto: true , select : false, unique: true},
    page_id : { type: String, default : require('shortid').generate() , unique: true},
    url : { type:String },
    created : { type: Date , default: Date.now() }
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