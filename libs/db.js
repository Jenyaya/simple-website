var mongoose = require('mongoose');
var itemModel = require('./models/itemSchema.js');


mongoose.connect('mongodb://aet01-node01.devops-int.avid.com/test');


exports.initMongoConnection = function () {

    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function (callback) {
        console.log('Connected to Mongo on aet01')
    });

}


exports.saveItem = function (itemData, cb) {

    var item = new itemModel(itemData);

    item.save(function (err, item) {
        if (err) console.error(err);

        cb(err, item);
    });

}

exports.findByTag = function (cb) {
    itemModel.find({tags: /tag/}, cb);
}


exports.findAll = function (cb) {
    itemModel.find(cb);
};

exports.findById = function (id, cb) {
    itemModel.find({_id: id}, cb);
}





