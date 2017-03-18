import {Component} from "@angular/core";
import { FormBuilder, Validators } from '@angular/forms';
import {AuthService} from '../../.././services/auth.service';
import {User} from '.././User';
import {Router} from '@angular/router';
@Component({
    moduleId: module.id,
    selector: 'app-signup',
    templateUrl: `./signup.component.html`
})

export class SignUpComponent{
    user: User;
    response:{};
    public signUpForm = this.fb.group({
        email: [null, Validators.required],
        password: [null, Validators.required],
        username: [null, Validators.required]
    });
    constructor(public fb: FormBuilder, private authService: AuthService, private router: Router) {}

    ngOnInit() {
        let auth_verified=this.authService.useJwtHelper();
        console.log("auth_verified"+auth_verified);
        if(auth_verified){
            this.router.navigateByUrl('/dashboard');
        }
    }

    doSign(event) {
        console.log(event);
        console.log(this.signUpForm.value);
        this.user=this.signUpForm.value;
        this.authService.userSignUp(this.user)
            .subscribe(response =>{
                console.log(response);
                this.response=response;
                if(response.user){
                    this.router.navigateByUrl('/');
                }
                else{

                }
            })
    }
}