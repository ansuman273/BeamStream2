import {Component, OnInit} from "@angular/core";
import { FormGroup,FormBuilder, Validators } from '@angular/forms';
import {User} from '.././User';
import {AuthService} from '../../.././services/auth.service';
import {Router} from '@angular/router';
@Component({
    moduleId: module.id,
    selector: 'app-login',
    templateUrl: `./login.component.html`
})

export class LoginComponent implements OnInit{
    user: User;
    response:{};
    public loginForm = this.fb.group({
        email: [null, Validators.required],
        password: [null, Validators.required]
    });

    constructor (public fb: FormBuilder,private authService:AuthService, private router: Router){

    }
    ngOnInit() {
        let auth_verified=this.authService.useJwtHelper();
        console.log("auth_verified"+auth_verified);
        if(auth_verified){
            this.router.navigateByUrl('/dashboard');
        }
    }
    doLogin(event) {
        console.log(event);
        console.log(this.loginForm.value);
        this.user=this.loginForm.value;
        this.authService.userLogin(this.user)
            .subscribe(response =>{
                console.log(response);
                this.response=response;
                if(response.redirect){
                    this.router.navigateByUrl('/');
                }
                else{
                    if(response.message){

                    }
                    if(response.user){
                        localStorage.apiToken =response.user.local.apiToken;
                        localStorage.currentUser =response.user.local.username;
                        this.router.navigateByUrl('/dashboard');
                    }
                }
            })
    }


}