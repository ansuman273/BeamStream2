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
var dashboard_service_1 = require("../../services/dashboard.service");
var auth_service_1 = require("../.././services/auth.service");
var router_1 = require("@angular/router");
var DashBoardComponent = (function () {
    function DashBoardComponent(dashBoardService, authService, router) {
        var _this = this;
        this.dashBoardService = dashBoardService;
        this.authService = authService;
        this.router = router;
        this.auth_verified = this.authService.useJwtHelper();
        console.log("auth_verified" + this.auth_verified);
        if (this.auth_verified) {
            this.dashBoardService.getInventoryItems()
                .subscribe(function (inventoryItems) {
                console.dir(inventoryItems);
                _this.inventoryItems = inventoryItems;
            });
        }
        else {
            this.router.navigateByUrl('');
        }
    }
    return DashBoardComponent;
}());
DashBoardComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'app-dashboard',
        templateUrl: "./dashboard.component.html",
        styleUrls: ['./dashboard.component.css']
    }),
    __metadata("design:paramtypes", [dashboard_service_1.DashBoardService, auth_service_1.AuthService, router_1.Router])
], DashBoardComponent);
exports.DashBoardComponent = DashBoardComponent;
//# sourceMappingURL=dashboard.component.js.map