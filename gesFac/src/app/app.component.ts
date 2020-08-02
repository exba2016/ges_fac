import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {SidebarService} from './sidebar/sidebar.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'gesFac';
  url: string;
  constructor(
    public sidebarservice: SidebarService,
    private router: Router) { }
  ngOnInit(): void{
    this.router.events.forEach(event => {
      if (event instanceof NavigationEnd) {
        this.url = this.router.url;
        console.log(this.router.url);
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
