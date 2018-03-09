const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var username = "publicuser" ;
var password ="publicpassword";
var host = "ds261078.mlab.com";
var port = 61078;
var db = "freecodecamp";


exports.pages = mongoose.model("urlshortener_pages",Schema({
   // _id: { type: mongoose.Schema.Types.ObjectId, auto: true , select : false, unique: true},
    page_id : { type: String, default : require('shortid').generate() , unique: true},
    url : { type:String },
    created : { type: Date , default: Date.now() }
}));

exports.connect = () => {
    var MONGODB_URI = 'mongodb://'+username+':'+password+'@'+host+':'+port+'/'+db;
    mongoose.connect(MONGODB_URI,{}, (err) => {
        if(err) {
            console.log(`MongoDB: ${err}`);
            process.exit();
        }else{
            console.log(`MongoDB connected to: ${host}:${port}/${db}`);
        }
    });
}