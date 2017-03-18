import {Injectable} from '@angular/core';
import { Headers} from '@angular/http';
import { AuthHttp } from 'angular2-jwt';
import 'rxjs/add/operator/map';

@Injectable()
export class TaskService{
    constructor(private authHttp:AuthHttp){
        //console.log("Task Sevice Initiallized...");
    }

    getTasks(){
        return this.authHttp.get('/api/tasks')
            .map(res => res.json());
    }

    addTask(newTask){
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.authHttp.post('/api/task', JSON.stringify(newTask), {headers : headers})
            .map(res => res.json());
    }

    deleteTask(id){
        return this.authHttp.delete('api/task/'+id)
            .map( res => res.json());
    }

    updateStatus(task){
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.authHttp.put('/api/task/'+task._id, JSON.stringify(task), {headers : headers})
            .map(res => res.json());
    }
}