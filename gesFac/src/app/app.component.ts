import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { SidebarService } from './sidebar/sidebar.service';
import { GlobalService } from './pages/services/global.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'gesFac';
  url: string;
  constructor(
    public sidebarservice: SidebarService,
    public globalService: GlobalService,
    private router: Router) {

    }
  ngOnInit(): void {
    this.router.events.forEach(event => {
      if (event instanceof NavigationEnd) {
        this.url = this.router.url;
        console.log(this.router.url);
        let user = localStorage.getItem('user');
        if (!user) {
          if (!this.globalService.user)
            this.router.navigate(['/login']);

        } else {
          user = JSON.parse(user);
          console.log("retrive user ", user);
          this.globalService.user = user;
        }
        for(let m of this.sidebarservice.menus){
          console.log("Sub Menu ",m);
          if(m.submenus){
            for(let sub of m.submenus){
              if(sub.url && sub.url===this.url && sub.auth.role!=this.globalService.user.role.name){
                if(this.globalService.user.role.name!="ROLE_ADMIN"){
                  this.router.navigate(['/login']);
                }

              }
            }
          }else
          if(m.url && m.url===this.url && m.auth.role!=this.globalService.user.role.name){

            this.router.navigate(['/login']);
          }
        }
        // this.router.navigate(['/login']);
      }
    });
  }
  toggleSidebar(): void {
    this.sidebarservice.setSidebarState(!this.sidebarservice.getSidebarState());
  }
  toggleBackgroundImage(): void {
    this.sidebarservice.hasBackgroundImage = !this.sidebarservice.hasBackgroundImage;
  }
  getSideBarState(): any {
    return this.sidebarservice.getSidebarState();
  }

  hideSidebar(): void {
    this.sidebarservice.setSidebarState(true);
  }
}
