var index = require('./index.controller')
var tasks = require('.././api/task/index');
var users = require('.././api/user/index');
var dashboard = require('.././api/dashboard/index');
var video = require('.././api/videos/index');

module.exports = function(app, passport, server, gfs) {

    app.get('/', function (req, res, next) {
        index.landingPage(req, res);
    });

    app.use('/api', isAuthorized, [tasks, users,video, dashboard ]);

    // =====================================
    // LOGIN ===============================
    // =====================================
    // show the login form
    app.get('/login', function(req, res) {
        // render the page and pass in any flash data if it exists
        res.status(200).send({ message: req.flash('loginMessage')});
    });

    // process the login form
    app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/login', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    // =====================================
    // Token Auth ==========================
    // =====================================
    // Give access to TT user with valid token

    app.get('/track', passport.authenticate('track-login', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/login', // redirect back to the signup page if there is an error
        failureFlash : true
    }));

    // =====================================
    // SIGNUP ==============================
    // =====================================
    // show the signup form
    app.get('/signup', function(req, res) {
        // render the page and pass in any flash data if it exists
        res.status(200).send({ message: req.flash('signupMessage')});
    });

    // process the signup form
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    // =====================================
    // PROFILE SECTION =========================
    // =====================================
    // we will want this protected so you have to be logged in to visit
    // we will use route middleware to verify this (the isLoggedIn function)
    app.get('/profile', isAuthorized, function(req, res) {
        res.status(200).send({
            user : req.user // get the user out of session and pass to template
        });
    });

    // =====================================
    // LOGOUT ==============================
    // =====================================
    app.get('/logout', function(req, res) {
        req.logout();
        res.status(200).send({ redirect:"/"});
    });
};

// route middleware to check basic and token authentication
function isAuthorized(req, res, next) {

    // if user is authenticated in the session and has a valid token carry on
    if(req.path ==='/profile'){
        if (req.isAuthenticated())
            return next();

        res.send({ redirect:"/"});
    }
    else {
        var token = req.headers['authorization'].replace('Bearer: ', '');
        //console.log("token" + token);
        var jwt = require('jsonwebtoken');
        jwt.verify(token, 'Inventory321', function(err, decoded) {
            if (err) {
                //console.log("Error"+err);
                res.status(403).send("invalid token");
            }
            else{
                //console.log(decoded);
                var current_user = req.session.user.local.username;
                var isValidUser = false;
                if (current_user == decoded.username) {
                    isValidUser = true;
                }
                //console.log("isValidUser" + isValidUser);
                if (req.isAuthenticated() && isValidUser) {
                    return next();
                }

                res.status(403).send("invalid token");
            }
        });

    }
}
