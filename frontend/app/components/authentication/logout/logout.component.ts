import {Component} from "@angular/core";
import {Router} from '@angular/router';
import {AuthService} from '../../.././services/auth.service';
@Component({
    moduleId: module.id,
    selector: 'app-logout',
    template: ''
})

export class LogoutComponent{

    constructor (private authService:AuthService, private router: Router){
        this.authService.userLogout()
            .subscribe(response =>{
                console.log(response);
                if(response.redirect){
                    localStorage.removeItem('apiToken');
                    localStorage.removeItem('currentUser');
                    this.router.navigateByUrl('/');
                }
            })
    }

}