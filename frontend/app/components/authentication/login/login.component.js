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
var forms_1 = require("@angular/forms");
var auth_service_1 = require("../../.././services/auth.service");
var router_1 = require("@angular/router");
var LoginComponent = (function () {
    function LoginComponent(fb, authService, router) {
        this.fb = fb;
        this.authService = authService;
        this.router = router;
        this.loginForm = this.fb.group({
            email: [null, forms_1.Validators.required],
            password: [null, forms_1.Validators.required]
        });
    }
    LoginComponent.prototype.ngOnInit = function () {
        var auth_verified = this.authService.useJwtHelper();
        console.log("auth_verified" + auth_verified);
        if (auth_verified) {
            this.router.navigateByUrl('/dashboard');
        }
    };
    LoginComponent.prototype.doLogin = function (event) {
        var _this = this;
        console.log(event);
        console.log(this.loginForm.value);
        this.user = this.loginForm.value;
        this.authService.userLogin(this.user)
            .subscribe(function (response) {
            console.log(response);
            _this.response = response;
            if (response.redirect) {
                _this.router.navigateByUrl('/');
            }
            else {
                if (response.message) {
                }
                if (response.user) {
                    localStorage.apiToken = response.user.local.apiToken;
                    localStorage.currentUser = response.user.local.username;
                    _this.router.navigateByUrl('/dashboard');
                }
            }
        });
    };
    return LoginComponent;
}());
LoginComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'app-login',
        templateUrl: "./login.component.html"
    }),
    __metadata("design:paramtypes", [forms_1.FormBuilder, auth_service_1.AuthService, router_1.Router])
], LoginComponent);
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map