var mongoose = require('mongoose');

//var mongoose = require('../db.js');

var itemSchema = new mongoose.Schema({
    description: String,
    tags: String,
    imageUrl: String,
    date: {type: Date, default: Date.now}
})


module.exports = mongoose.model('Item', itemSchema);