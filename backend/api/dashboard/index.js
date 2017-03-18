var express = require('express');
var app = express.Router();
var dashboard= require('./dashboard.controller');

app.get('/dashboard', function(req, res, next){
    //call to dashboardController
    //dashboard.fetchInventoryData(req, res);
    res.send({'videos':[]});
});
module.exports = app;