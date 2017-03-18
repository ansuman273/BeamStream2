import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import { AuthHttp } from 'angular2-jwt';
import { JwtHelper } from 'angular2-jwt';
import 'rxjs/add/operator/map';
@Injectable()
export class AuthService{
    constructor(private http:Http , public authHttp:AuthHttp){
        console.log("Auth Service Initialized...");
    }
    jwtHelper: JwtHelper = new JwtHelper();
    useJwtHelper() {
        console.log(localStorage.getItem('apiToken'));
        if (localStorage.getItem('apiToken')){
            var token = localStorage.getItem('apiToken');

            console.log(
                this.jwtHelper.decodeToken(token),
                this.jwtHelper.getTokenExpirationDate(token),
                this.jwtHelper.isTokenExpired(token)
            );
            if(!this.jwtHelper.isTokenExpired(token)){
                return true;
            }
            else{
                localStorage.clear();
                return false;
            }
        }

        return false;

    }

    userLogin(User){
        console.log("Logging In...");
        return this.http.post('/login',User)
            .map(res => res.json());
    }

    userSignUp(User){
        console.log("Signing up...");
        return this.http.post('/signup',User)
            .map(res => res.json());
    }

    userLogout(){
        console.log("Signing Out...");
        return this.authHttp.get('/logout')
            .map(res => res.json());
    }
}