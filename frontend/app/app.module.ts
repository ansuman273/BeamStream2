import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpModule} from '@angular/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './routing/app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgGridModule } from 'angular2-grid';
import { AuthModule } from './auth.module';
//added Components
import { AppComponent } from './app.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { DashBoardComponent } from './components/dashboard/dashboard.component';
import {AuthenticationComponent} from './components/authentication/authentication.component';
import {HeaderComponent} from './components/header/header.component';
import {FooterComponent} from './components/footer/footer.component';
import {LoginComponent} from './components/authentication/login/login.component';
import { SignUpComponent } from './components/authentication/signup/signup.component';
import { LogoutComponent } from './components/authentication/logout/logout.component';
import { VideosComponent } from './components/videos/videos.component';
//added Services
import { TaskService } from './services/task.service';
import { DashBoardService } from './services/dashboard.service';
import {AuthService} from './services/auth.service';
@NgModule({
  imports: [ BrowserModule, HttpModule, FormsModule, AppRoutingModule, ReactiveFormsModule, NgGridModule, AuthModule ],
  declarations: [ AppComponent, TasksComponent, DashBoardComponent,AuthenticationComponent,
    HeaderComponent, FooterComponent, LoginComponent, SignUpComponent, LogoutComponent, VideosComponent],
  providers:[TaskService, DashBoardService, AuthService],
  bootstrap: [ AppComponent ]
})
export class AppModule {}