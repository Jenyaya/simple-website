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


var myData = {default: 11}

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


    console.log(req.get('Content-Type'));
    console.log(req.params);
    //console.log(req.body);

    db.saveItem(req.body)

    // res.set('Content-Type', "application/json");
    res.statusCode = 201;

    var myResponse = {description: description, tags: tags, imageUrl: imageUrl};
    myData = myResponse

    res.redirect('/data')

    // res.send(JSON.stringify(myResponse));
});


app.get('/data', function (req, res) {
    //console.log(myData);


   // var storedItem = db.findByTag(myData.tags.split(';')[0]);
    console.log('Got from Mongo:');
    var storedItems = db.findAll();
    console.log(storedItems);

    var lastItem = storedItems[storedItems.length-1]

    res.render('data',
        {
            imageUrl: lastItem.imageUrl,
            descriptions: lastItem.description,
            tags: lastItem.tags
        }
    )

})

app.listen(3000);