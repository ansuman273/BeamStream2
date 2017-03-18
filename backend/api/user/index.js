var express = require('express');
var app = express.Router();
var users= require('./user.controller');

app.get('/saveUser', function(req, res, next){
    users.saveUser(req,res);
});
module.exports = app;