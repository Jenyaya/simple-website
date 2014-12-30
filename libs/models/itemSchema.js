var mongoose = require('mongoose');

//var mongoose = require('../db.js');

var itemSchema = mongoose.Schema({
    description: String,
    tags: String,
    imageUrl: String
})


module.exports.model = mongoose.model('Item', itemSchema);