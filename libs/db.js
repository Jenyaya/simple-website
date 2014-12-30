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


exports.saveItem = function (itemData) {

    var item = new itemModel.model(itemData);

    item.save(function (err, item) {
        if (err) return console.error(err);
    });
   // console.log(itemData);
}

exports.findByTag = function (tag) {
    console.log("Tags for search:" + tag);
    itemModel.model.find({tags: /tag/}, function (err, items) {
        if (err) return console.error(err);

      //  console.log(items);
        return items;
    })

}

exports.findAll = function () {
    console.log("search all");
  var foundItems =  itemModel.model.find(function (err, items) {
         if (err) return console.error(err);

       // console.log(items);
      //  return items;
    })

    return foundItems;

}



