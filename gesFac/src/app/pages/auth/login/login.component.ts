import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { GlobalService } from '../../services/global.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ChangePasswordComponent } from '../../modals/change-password/change-password.component';
import {AlertService} from '../../services/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  data: any;
  message: string;

  constructor(
    private loginService: LoginService,
    private router: Router,
    private globalService: GlobalService,
    private modalService: NgbModal,
    private alertService:AlertService
  ) {
    this.data = {
      username: '',
      password: ''
    };
  }

  ngOnInit(): void {

  }

  logon(): void {
    console.log("test ", this.data);
    this.loginService.loginRequest(this.data)
      .subscribe((res) => {
        console.log('login', res);
        if (res.body.status !== 'error') {
        
          this.loginService.saveToken(res.body);
          this.loginService.findUser(res.body.username).subscribe((rs) => {
            console.log("user ", rs);
            this.globalService.user = rs;
            localStorage.setItem('user', JSON.stringify(rs));

            this.message = '';
            this.alertService.alert("Bienvenu "+rs.nom,"success");
            if (rs.statuts === 'not_active') {
              const modalRef = this.modalService.open(ChangePasswordComponent);
              modalRef.componentInstance.passEntry.subscribe((receivedData) => {
                console.log("after change password valide ", receivedData);

                let user = rs;
                this.loginService.changePassword(receivedData.newPassword, this.globalService.user.id).subscribe((rsss) => {
                  localStorage.removeItem("user");
                  localStorage.setItem("user", JSON.stringify(rsss));
                  this.globalService.user = rsss;
                  this.alertService.alert("Changement du mot de passe éffectué avec succès !","success");
                },
                err=>{
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

            if (res.body.authorities[0].authority === 'ROLE_CLIENT') {
              this.router.navigate(['commande']);
            } else {
              this.router.navigate(['accueil']);
            }
          },error=>{
            this.alertService.alert("Echec de l'authentification, l'username ou le mot de passe est incorrect !","warning");
          });



        }
        else {
          if (res.body.error === 'INVALID_USERNAME') {
            this.message = 'Utilisateur inexistant';
            this.alertService.alert("Echec de l'authentification, l'username ou le mot de passe est incorrect !","warning");
          }
          else if (res.body.error === 'BAD_CREDENTIALS') {
            this.message = 'Mot de passe incorect';
            this.alertService.alert("Echec de l'authentification, l'username ou le mot de passe est incorrect !","warning");
          }
        }
      },
        err => {
          console.log(err);
          this.alertService.alert("Echec de l'authentification, l'username ou le mot de passe est incorrect !","warning");
        });
  }


}
