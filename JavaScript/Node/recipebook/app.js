var express = require('express'),
    path = require('path'),
    bodyparser = require('body-parser'),
    cons = require('consolidate'),
    pg = require('pg'),
    app = express();
var config = {
        user: 'mwalugha', //env var: PGUSER
        database: 'recipedb', //env var: PGDATABASE
        password: 'itisjustme', //env var: PGPASSWORD
        host: 'localhost', // Server hosting the postgres database
        port: 5432, //env var: PGPORT
        max: 10, // max number of clients in the pool
        idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
};
var pool = new pg.Pool(config);

// DB connect
// var connectString = "postgress://mwalugha:itisjustme@locolhost:5432/recipedb";
// var client = new pg.Client(connectString);

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
    // PG connect
    pool.connect(function(err, client, done) {
        if(err) {
            return console.error('error fetching client from pool', err);
        }
        client.query('SELECT * From public.recipes;', function(err, result) {      
            if(err) {
                return console.error('error running query', err);
            }
            res.render('index', {recipes: result.rows});
            done();
        });
    });
});

app.post('/add', function(req, res){
    pool.connect(function(err, client, done) {
        if(err) {
            return console.error('error fetching client from pool', err);
        }
        client.query("INSERT INTO recipes(name, ingredients, directions) VALUES($1, $2, $3;", [req.body.name, req.body.ingredients, req.body.directions]);

        done();
        res.redirect('/');
    });
});

app.delete('/delete/:id', function(req, res){
    pool.connect(function(err, client, done) {
        if(err) {
            return console.error('error fetching client from pool', err);
        }
        client.query("DELETE FROM recipes WHERE id=$1",
        [req.params.id]);

        done();
        res.send(200);
    });
});

app.post('/edit', function(req, res) {
    pool.connect(function(err, client, done) {
        if(err) {
            return console.error('error fetching client from pool', err);
        }
        client.query("UPDATE recipes SET name=$1, ingredients=$2, directions=$3 WHERE id=$4;)", 
        [req.body.name, req.body.ingredients, req.body.directions, req.body.id]);

        done();
        res.redirect('/');
    });
});

// Server
app.listen(3000, function(){
    console.log("Server Started on Port 3000");
});
