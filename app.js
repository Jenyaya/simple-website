/*
 * Module dependencies
 */
var express = require('express')
    , stylus = require('stylus')
    , nib = require('nib')
  //  , bodyParser = require('body-parser')
    ;

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


// accept POST request on the homepage
app.get('/add', function (req, res) {
    res.render('add',
        {title: 'Add item'}
    )
})

app.post('/add', function (req, res) {
    var tags = req.body.tags,
        description = req.body.description;


    console.log(req.get('Content-Type'));
    console.log(req.params);
    console.log(req.body);

    res.set('Content-Type', "application/json");
    res.statusCode = 201;

    var myResponse = {description: description, tags: tags};
    res.send(JSON.stringify(myResponse));
});


app.listen(3000);