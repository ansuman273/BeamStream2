import {Component} from "@angular/core";
import { DashBoardService } from '../../services/dashboard.service';
import { Inventory } from './Inventory';
import {AuthService} from '../.././services/auth.service';
import {Router} from '@angular/router';
@Component({
    moduleId: module.id,
    selector: 'app-dashboard',
    templateUrl: `./dashboard.component.html`,
    styleUrls:['./dashboard.component.css']
})

export class DashBoardComponent{
    auth_verified: boolean;

    inventoryItems: Inventory[];
    constructor(private dashBoardService:DashBoardService,private authService:AuthService, private router: Router){
        this.auth_verified=this.authService.useJwtHelper();
        console.log("auth_verified"+this.auth_verified);

        if (this.auth_verified){
            this.dashBoardService.getInventoryItems()
                .subscribe(inventoryItems =>{
                    console.dir(inventoryItems);
                    this.inventoryItems = inventoryItems;
                });
        }
        else{
            this.router.navigateByUrl('');
        }

    }
}