var mongoose = require('mongoose');
// var config = require("config");

mongoose.connect("mongodb://localhost:27017/chat", { useNewUrlParser: true } );

module.exports = mongoose;