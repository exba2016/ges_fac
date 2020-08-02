import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {LoginService} from '../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  data: any;
  message: string;

  constructor(private loginService: LoginService, private router: Router) {
    this.data = {
      username: '',
      password: ''
    };
  }

  ngOnInit(): void {

  }

  logon(): void{

    this.loginService.loginRequest(this.data)
      .subscribe((res) => {
          console.log('login', res);
          if (res.body.status !== 'error'){
            this.loginService.saveToken(res.body);
            this.message = '';
            if (res.body.authorities[0].authority === 'ROLE_CLIENT'){
              this.router.navigate(['medecin']);
            }else{
              this.router.navigate(['accueil']);
            }
          }
          else{
            if (res.body.error === 'INVALID_USERNAME'){
              this.message = 'Utilisateur inexistant';
            }
            else if (res.body.error === 'BAD_CREDENTIALS'){
              this.message = 'Mot de passe incorect';
            }
          }
        },
        err => {
          console.log(err);
        });
  }


}
