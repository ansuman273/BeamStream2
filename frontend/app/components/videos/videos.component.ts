import {Component} from "@angular/core";
import { ActivatedRoute } from '@angular/router';
import { Video } from './Video';
import {AuthService} from '../.././services/auth.service';
import {Router} from '@angular/router';
@Component({
    moduleId: module.id,
    selector: 'app-videos',
    templateUrl: './videos.component.html'
})

export class VideosComponent{
    auth_verified: boolean;
    videos: Video[];
    title: string;
    poster: string;
    channelImg: string;
    video:string;
    constructor(private authService:AuthService, private router: Router){
        this.auth_verified=this.authService.useJwtHelper();
        console.log("auth_verified"+this.auth_verified);

        if (this.auth_verified){
            console.log('this.auth_verified'+this.auth_verified);
        }
        else{
            this.router.navigateByUrl('');
        }

    }
    addVideo(event){
        event.preventDefault();
        //console.log(this.title);
        var newTask ={
            title:this.title,
            video:this.video,
        }

        console.log(newTask);

    }

    fileSelected(event){
        console.log(event);


    }
}