"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var router_1 = require("@angular/router");
var dashboard_component_1 = require(".././components/dashboard/dashboard.component");
var tasks_component_1 = require(".././components/tasks/tasks.component");
var authentication_component_1 = require(".././components/authentication/authentication.component");
var login_component_1 = require(".././components/authentication/login/login.component");
var signup_component_1 = require(".././components/authentication/signup/signup.component");
var logout_component_1 = require(".././components/authentication/logout/logout.component");
var videos_component_1 = require(".././components/videos/videos.component");
var core_1 = require("@angular/core");
var routes = [
    {
        path: 'tasks',
        component: tasks_component_1.TasksComponent,
        data: {
            name: 'tasks'
        }
    },
    {
        path: 'dashboard',
        component: dashboard_component_1.DashBoardComponent,
        data: {
            name: 'dashboard'
        }
    },
    {
        path: 'videos',
        component: videos_component_1.VideosComponent,
        data: {
            name: 'videos'
        }
    },
    {
        path: 'auth',
        component: authentication_component_1.AuthenticationComponent,
        children: [
            { path: 'login', component: login_component_1.LoginComponent, data: { name: 'auth' } },
            { path: 'signup', component: signup_component_1.SignUpComponent, data: { name: 'auth' } },
            { path: 'logout', component: logout_component_1.LogoutComponent, data: { name: 'auth' } },
            { path: '', redirectTo: 'loginPage', pathMatch: 'full' }
        ],
        data: {
            name: 'auth'
        }
    },
    {
        path: '',
        redirectTo: '/auth/login',
        pathMatch: 'full'
    }
];
var AppRoutingModule = (function () {
    function AppRoutingModule() {
    }
    return AppRoutingModule;
}());
AppRoutingModule = __decorate([
    core_1.NgModule({
        imports: [router_1.RouterModule.forRoot(routes, { useHash: true })],
        exports: [router_1.RouterModule]
    })
], AppRoutingModule);
exports.AppRoutingModule = AppRoutingModule;
//# sourceMappingURL=app-routing.module.js.map