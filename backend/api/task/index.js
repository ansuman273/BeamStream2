var express = require('express');
var app = express.Router();
var tasksController = require('./task.controller.js');

//Get All tasks
app.get('/tasks', function(req, res, next){
    tasksController.getTasks(req, res);
});

//Get a single task
app.get('/task/:id', function(req, res, next){
    tasksController.getTask(req, res);
});

//Create a task
app.post('/task', function(req, res, next){
    tasksController.createTask(req, res);
});

//Delete a task
app.delete('/task/:id', function(req, res, next){
    tasksController.deleteTask(req, res);
});

//Update a task
app.put('/task/:id', function(req, res, next){
    tasksController.updateTask(req, res);
});
module.exports = app;