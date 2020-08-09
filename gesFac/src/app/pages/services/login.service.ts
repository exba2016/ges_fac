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
  public findUser(username: string): any{
    return this.http.post<any>(this.apiConfig.REST_API_SERVER + '/users',username);
  }

  public encodePassword(password:string,id:number):any{
    return this.http.put<any>(this.apiConfig.REST_API_SERVER+'/encodePassword/'+id,password);
  }
  public changePassword(password:string,id:number):any{

    return this.http.put<any>(this.apiConfig.REST_API_SERVER+'/changePassword/'+id,password);
  }

  public getAllUser():any{
    return this.http.get<any>(this.apiConfig.REST_API_SERVER+"/users");
  }
  public addUser(user:any):any{
    return this.http.post<any>(this.apiConfig.REST_API_SERVER+"/users/add",user);
  }
  

  //Roles
  public getAllRoles():any{
    return this.http.get<any>(this.apiConfig.REST_API_SERVER+"/listRoles");
  }

  saveToken(jwt): void{
    localStorage.setItem('token', jwt.accessToken);
    localStorage.setItem('authorities', jwt.authorities);
    localStorage.setItem('username', jwt.username);
  }
}
