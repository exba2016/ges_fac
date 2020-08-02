import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ApiConfigService} from './api-config.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(
    public http: HttpClient,
    public apiConfig: ApiConfigService) { }

  public loginRequest(user: any): any{
    return this.http.post<any>(this.apiConfig.REST_API_SERVER + '/login', user, {observe: 'response'});
  }

  saveToken(jwt): void{
    localStorage.setItem('token', jwt.accessToken);
    localStorage.setItem('authorities', jwt.authorities);
    localStorage.setItem('username', jwt.username);
  }
}
