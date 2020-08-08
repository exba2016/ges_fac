import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { SidebarService } from './sidebar.service';
import { Router } from '@angular/router';
import { GlobalService } from '../pages/services/global.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ChangePasswordComponent } from '../pages/modals/change-password/change-password.component';
import { LoginService } from '../pages/services/login.service';
// import { MenusService } from './menus.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  animations: [
    trigger('slide', [
      state('up', style({ height: 0 })),
      state('down', style({ height: '*' })),
      transition('up <=> down', animate(200))
    ])
  ]
})
export class SidebarComponent implements OnInit {
  menus = [];
  constructor(
    public sidebarservice: SidebarService,
    public globalService: GlobalService,
    private modalService: NgbModal,
    private loginService:LoginService,
    private router: Router) {
    this.menus = sidebarservice.getMenuList();
  }

  ngOnInit() {
  }

  getSideBarState() {
    return this.sidebarservice.getSidebarState();
  }

  toggle(currentMenu) {
    if (currentMenu.type === 'dropdown') {
      this.menus.forEach(element => {
        if (element === currentMenu) {
          currentMenu.active = !currentMenu.active;
        } else {
          element.active = false;
        }
      });
    }
  }

  getState(currentMenu) {

    if (currentMenu.active) {
      return 'down';
    } else {
      return 'up';
    }
  }

  hasBackgroundImage() {
    return this.sidebarservice.hasBackgroundImage;
  }

  logoff() {
    localStorage.removeItem("user");
    this.globalService.user = null;
    this.router.navigate(['/login']);
  }
  changerPassword() {
    const modalRef = this.modalService.open(ChangePasswordComponent);
    modalRef.componentInstance.passEntry.subscribe((receivedData) => {
      console.log("after change password valide ", receivedData);
      
      let user = this.globalService.user;
      this.loginService.changePassword(receivedData.newPassword, this.globalService.user.id).subscribe((rsss) => {
        localStorage.removeItem("user");
        localStorage.setItem("user", JSON.stringify(rsss));
        this.globalService.user = rsss;
      },
        err => {
          console.log(err);
        });



      /*const service = { id: receivedData.service, libelle: '' };
      let specialites = [];
      receivedData.specialites.forEach(element => {
        specialites.push({
          id: element, libelle: ''
        })
      });
      receivedData.specialites = specialites;
      receivedData.service = service;
      console.log(receivedData);
      this.medecinService.saveOrUpdate(receivedData)
        .subscribe(res => {
          this.medecins.push(res);
        },
          err => {
            console.log(err);
          });
          */
    });
  }
}
