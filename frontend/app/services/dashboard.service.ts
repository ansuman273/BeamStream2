import {Injectable} from '@angular/core';
import { AuthHttp } from 'angular2-jwt';
import 'rxjs/add/operator/map';

@Injectable()
export class DashBoardService{
    constructor(private authHttp:AuthHttp){
        console.log("Dashboard Service Initialized...");
    }

    getInventoryItems(){
        return this.authHttp.get('/api/dashboard')
            .map(res => res.json());
    }
}