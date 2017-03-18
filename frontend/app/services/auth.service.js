"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var angular2_jwt_1 = require("angular2-jwt");
var angular2_jwt_2 = require("angular2-jwt");
require("rxjs/add/operator/map");
var AuthService = (function () {
    function AuthService(http, authHttp) {
        this.http = http;
        this.authHttp = authHttp;
        this.jwtHelper = new angular2_jwt_2.JwtHelper();
        console.log("Auth Service Initialized...");
    }
    AuthService.prototype.useJwtHelper = function () {
        console.log(localStorage.getItem('apiToken'));
        if (localStorage.getItem('apiToken')) {
            var token = localStorage.getItem('apiToken');
            console.log(this.jwtHelper.decodeToken(token), this.jwtHelper.getTokenExpirationDate(token), this.jwtHelper.isTokenExpired(token));
            if (!this.jwtHelper.isTokenExpired(token)) {
                return true;
            }
            else {
                localStorage.clear();
                return false;
            }
        }
        return false;
    };
    AuthService.prototype.userLogin = function (User) {
        console.log("Logging In...");
        return this.http.post('/login', User)
            .map(function (res) { return res.json(); });
    };
    AuthService.prototype.userSignUp = function (User) {
        console.log("Signing up...");
        return this.http.post('/signup', User)
            .map(function (res) { return res.json(); });
    };
    AuthService.prototype.userLogout = function () {
        console.log("Signing Out...");
        return this.authHttp.get('/logout')
            .map(function (res) { return res.json(); });
    };
    return AuthService;
}());
AuthService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http, angular2_jwt_1.AuthHttp])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map