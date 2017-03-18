// app/models/user.js
// load the things we need
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

// define the schema for our user model
var userSchema = mongoose.Schema({

    local            : {
        email        : String,
        password     : String,
        username     : String,
        apiToken     : String
    },
    facebook         : {
        id           : String,
        token        : String,
        email        : String,
        name         : String
    },
    twitter          : {
        id           : String,
        token        : String,
        displayName  : String,
        username     : String
    },
    google           : {
        id           : String,
        token        : String,
        email        : String,
        name         : String
    }

});

// methods ======================
// generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

// checking token auth process
userSchema.methods.verifyToken = function(username,token,callback) {
    var redis = require('redis');
    var redis_host="127.0.0.1";
    var redis_port="6379";
    var password="e45440aeb237edc8f61d62d49a089e0c68001c8acab33c19296ef4a4ceb57aa3";
    var client = redis.createClient();
    //frontend.auth(password);
    client.on("error", function (err) {

        console.log("Error " + err);

    });

    client.get(username, function(err, reply) {
        // reply is null when the key is missing
        console.log("Retrieved Token"+reply);
        if(token === reply){
            console.log("Returning true");
            return callback(null,true);
        }
        else{
            console.log("Returning false");
            return callback(null,false);
        }
    });

    client.quit();
};

userSchema.methods.generateJwtToken = function (session_user) {
    // add jsonwebtoken and generate token here
    var jwt    = require('jsonwebtoken');
    var token  = jwt.sign(session_user, 'Inventory321', {
        expiresIn: '1h' // expires in 24 hours
    });
    return(token);
};
// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);
