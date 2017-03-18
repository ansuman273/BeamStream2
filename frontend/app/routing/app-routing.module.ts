import {Routes, RouterModule} from "@angular/router";
import { DashBoardComponent } from '.././components/dashboard/dashboard.component';
import { TasksComponent } from '.././components/tasks/tasks.component';
import {AuthenticationComponent} from '.././components/authentication/authentication.component';
import {LoginComponent} from '.././components/authentication/login/login.component';
import { SignUpComponent } from '.././components/authentication/signup/signup.component';
import { LogoutComponent } from '.././components/authentication/logout/logout.component';
import { VideosComponent } from '.././components/videos/videos.component';
import {NgModule} from "@angular/core";

const routes: Routes= [
    {
        path: 'tasks',
        component: TasksComponent,
        data: {
            name: 'tasks'
        }
    },
    {
        path: 'dashboard',
        component: DashBoardComponent,
        data: {
            name: 'dashboard'
        }
    },
    {
        path: 'videos',
        component: VideosComponent,
        data: {
            name: 'videos'
        }
    },
    {
        path: 'auth',
        component: AuthenticationComponent,
        children : [
            { path: 'login', component : LoginComponent, data: {name: 'auth'} },
            { path: 'signup', component : SignUpComponent, data: {name: 'auth'} },
            { path: 'logout', component : LogoutComponent, data: {name: 'auth'} },
            { path: '', redirectTo:'loginPage', pathMatch:'full' }
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
]

@NgModule({
    imports: [ RouterModule.forRoot(routes, { useHash: true })],
    exports: [ RouterModule ]

})

export class AppRoutingModule {}
