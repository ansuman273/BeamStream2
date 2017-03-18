var mongojs = require('mongojs');
var db = mongojs('mongodb://localhost:27017/inventory-app',['tasks']);

module.exports={

    //Get All tasks
    getTasks: function(req, res) {
        db.tasks.find(function(err, tasks){
            if(err){
                res.send(err);
            }
            res.status(200).json(tasks);
        })
    },

    //Get a single task
    getTask: function(req, res) {
        db.tasks.findOne({_id: mongojs.ObjectId(req.params.id)},function(err, task){
            if(err){
                res.send(err);
            }
            res.status(200).json(task);
        })
    },

    //Create a task
    createTask: function(req, res) {
        var task = req.body;
        if(!task.title || !(task.isDone + '')){
            res.status(400);
            res.json({"error":"Bad data"});
        }
        else{
            db.tasks.save(task,function(err, task){
                if(err){
                    res.status(500).send(err);
                }
                res.status(200).json(task);

            })
        }
    },

    //Delete a task
    deleteTask: function(req, res) {
        db.tasks.remove({_id: mongojs.ObjectId(req.params.id)},function(err, task){
            if(err){
                res.status(500).send(err);
            }
            res.status(200).json(task);
        })
    },

    //Update a task
    updateTask: function(req, res) {
        var task = req.body;
        var updTask = {};

        if(task.title){
            updTask.title = task.title;
        }
        if(task.isDone){
            updTask.isDone= task.isDone;
        }
        if(!updTask){
            res.status(400);
            res.json({"error":"Bad data"});
        }
        else{
            db.tasks.update({_id: mongojs.ObjectId(req.params.id)}, updTask, {}, function(err, task){
                if(err){
                    res.status(500).send(err);
                }
                res.status(200).json(task);
            })

        }
    }
}