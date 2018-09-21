var express = require('express'),
    path = require('path'),
    bodyparser = require('body-parser'),
    cons = require('consolidate'),
    dust = require('dustjs-helpers'),
    pg = require('pg'),
    app = express();

// DB connect
var connect = "postgress://mwalugha:itisjustme@locolhost/recipedb";

// Assign dust engine to .dust file
app.engine('dust', cons.dust);

// Set default Ext .dust
app.set('view engine', 'dust');
app.set('views', __dirname + '/views');

// Set public folder
app.use(express.static(path.join(__dirname, 'public')));

// Bodyparser middleware
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

app.get('/', function(req, res){
    console.log('TEST');
});

// Server
app.listen(3000, function(){
    console.log("Server Started on Port 3000");
});
