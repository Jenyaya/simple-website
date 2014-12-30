/*
 * Module dependencies
 */
var express = require('express')
    , stylus = require('stylus')
    , nib = require('nib')
//  , bodyParser = require('body-parser')
    ;

var db = require('./libs/db.js');
db.initMongoConnection();

var app = express();

//app.use(bodyParser.json());       // to support JSON-encoded bodies
//app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
//    extended: true
//}));

app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies


function compile(str, path) {
    return stylus(str)
        .set('filename', path)
        .use(nib());
}
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.logger('dev'));
app.use(express.json());

app.use(stylus.middleware(
    {
        src: __dirname + '/public'
        , compile: compile
    }
));

app.use(express.static(__dirname + '/public'));



app.get('/', function (req, res) {
    res.render('index',
        {title: 'Home'}
    )
})


app.get('/add', function (req, res) {
    res.render('add',
        {title: 'Add item'}
    )
})

app.post('/add', function (req, res) {
    var tags = req.body.tags,
        imageUrl = req.body.imageUrl,
        description = req.body.description;

    db.saveItem(req.body, function(err, item) {

        console.log(item);

        // res.set('Content-Type', "application/json");
        res.statusCode = 201;


        res.redirect('/data')

    })



    // res.send(JSON.stringify(myResponse));
});


app.get('/data', function (req, res) {
    //console.log(myData);


    // var storedItem = db.findByTag(myData.tags.split(';')[0]);

    db.findAll(function (err, data) {
        if (err) {
            return console.error(err);
        }

        var lastItem = data[data.length - 1]

        res.render('data',
            {
                imageUrl: lastItem.imageUrl,
                descriptions: lastItem.description,
                tags: lastItem.tags
            }
        )
    });


    //console.log('Got from Mongo:');


})


app.get('/data/:id', function (req, res) {
console.log(req.params);

    db.findById(req.params.id, function (err, data) {
        if (err) {
            return console.error(err);
        }

        console.log(data);

       var item = data[0];

        res.render('data',
            {
                imageUrl: item.imageUrl,
                descriptions: item.description,
                tags: item.tags
            }
        )
    });


})


app.listen(3000);