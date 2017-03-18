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
var auth_service_1 = require("../.././services/auth.service");
var router_1 = require("@angular/router");
var VideosComponent = (function () {
    function VideosComponent(authService, router) {
        this.authService = authService;
        this.router = router;
        this.auth_verified = this.authService.useJwtHelper();
        console.log("auth_verified" + this.auth_verified);
        if (this.auth_verified) {
            console.log('this.auth_verified' + this.auth_verified);
        }
        else {
            this.router.navigateByUrl('');
        }
    }
    VideosComponent.prototype.addVideo = function (event) {
        event.preventDefault();
        //console.log(this.title);
        var newTask = {
            title: this.title,
            video: this.video,
        };
        console.log(newTask);
    };
    VideosComponent.prototype.fileSelected = function (event) {
        console.log(event);
    };
    return VideosComponent;
}());
VideosComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'app-videos',
        templateUrl: './videos.component.html'
    }),
    __metadata("design:paramtypes", [auth_service_1.AuthService, router_1.Router])
], VideosComponent);
exports.VideosComponent = VideosComponent;
//# sourceMappingURL=videos.component.js.map