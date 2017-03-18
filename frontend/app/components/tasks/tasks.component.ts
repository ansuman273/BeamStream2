import { Component } from '@angular/core';
import { TaskService } from '../../services/task.service'
import { Task } from './Task';
import {AuthService} from '../.././services/auth.service';
import {Router} from '@angular/router';
@Component({
    moduleId: module.id,
    selector: 'tasks',
    templateUrl: 'tasks.component.html'
})
export class TasksComponent {
    tasks: Task[];
    title: string;
    auth_verified: boolean;
    constructor(private taskService:TaskService,private authService:AuthService, private router: Router){
        this.auth_verified=this.authService.useJwtHelper();
        console.log("auth_verified"+this.auth_verified);

        if (this.auth_verified){
            this.taskService.getTasks()
                .subscribe(tasks =>{
                    //console.log(tasks);
                    this.tasks = tasks;
                });
        }
        else{
            this.router.navigateByUrl('');
        }
    }

    addTask(event){
        event.preventDefault();
        //console.log(this.title);
        var newTask ={
            title:this.title,
            isDone: false
        }

        this.taskService.addTask(newTask)
            .subscribe(task =>{
                this.tasks.push(task);
                this.title="";
            });
    }

    deleteTask(id){
        var tasks = this.tasks;

        this.taskService.deleteTask(id).subscribe(data =>{
            if(data.n ==1 ){
                for(var i=0; i< tasks.length;i++){
                    if(tasks[i]._id == id){
                        tasks.splice(i,1);
                    }
                }
            }
        });
    }

    updateStatus(task){
        var _task={
            _id:task._id,
            title: task.title,
            isDone: !task.isDone
        }

        this.taskService.updateStatus(_task).subscribe(data =>{
            task.isDone = !task.isDone;
        });
    }


}