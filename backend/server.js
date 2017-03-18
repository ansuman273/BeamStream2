// server.js

// set up ======================================================================
// get all the tools we need
var express  = require('express');
var app      = express();
var port     = process.env.PORT || 3000;
var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash-plus');
var morgan = require('morgan');
var logger = require('express-logger');
var cookieParser = require('cookie-parser');
var bodyParser= require('body-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
var path = require('path');
var configDB = require('./config/database.js');
var http = require('http');
var fs= require('fs');
var server = http.createServer(app)
// configuration ===============================================================
mongoose.Promise = global.Promise;
mongoose.connect(configDB.url);// connect to our database
require('./config/passport')(passport); // pass passport for configuration

// set up different express MWs
app.use(logger({path: "./inventory.log"})); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
// Logging MW
app.use(morgan('dev'));

//view engine
app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');
app.engine('html', require('ejs').renderFile);

// for video store/stream gridfs
var Grid = require('gridfs-stream');
Grid.mongo = mongoose.mongo;

// required for passport
// Advanced usage
const connection = mongoose.createConnection(configDB.url);
var gfs;
connection.once('open', function () {
    gfs = Grid(connection.db);

    // all set!
})
app.use(session({
    secret: 'e-Inventory',
    saveUninitialized: true,
    resave: true,
    cookie: { maxAge: 3600000 },
    autoRemove: 'interval',
    autoRemoveInterval: 10,
    store: new MongoStore({ mongooseConnection: connection })
}));

app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

//set static folder (Angular 2)
app.use(express.static(path.join(__dirname, '../frontend'), { redirect: false }));

// routes ======================================================================
require('./routes/index.js')(app, passport, server,gfs); // load our routes and pass in our app and fully configured passport

function redirectUnmatched(req, res) {
    res.redirect("http://localhost:3000/");
}

app.use(redirectUnmatched);

//Start the express app
server.listen(port, function(){
    console.log('Server listening on port:'+port);
});