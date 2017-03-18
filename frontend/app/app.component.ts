import { Component } from '@angular/core';
import 'rxjs/add/operator/filter';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
@Component({
  moduleId:module.id,
  selector: 'my-app',
  templateUrl: './app.component.html'
})
export class AppComponent {
  current_route: String;
  constructor(
      private route: ActivatedRoute,
      private router: Router,
  ) { }

  ngOnInit() {
    this.router.events
        .filter(event => event instanceof NavigationEnd)
        .subscribe(event => {
          let currentRoute = this.route.root;
          while (currentRoute.children[0] !== undefined) {
            currentRoute = currentRoute.children[0];
          }
          //console.dir(currentRoute.snapshot.data);
          this.setCurrentRoute(currentRoute.snapshot.data);
        })
  }

  setCurrentRoute(route_obj){
    this.current_route= route_obj.name;
  }
}