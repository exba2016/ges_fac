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
  public getAllClient():any{
    return this.http.get<any>(this.apiConfig.REST_API_SERVER+"/users/client");
  }
  public addUser(user:any):any{
    return this.http.post<any>(this.apiConfig.REST_API_SERVER+"/users/add",user);
  }
  public updateUser(user:any,id:number):any{
    return this.http.put<any>(this.apiConfig.REST_API_SERVER+"/users/update/"+id,user);
  }
  public deleteUser(id:number):any{
    return this.http.get<any>(this.apiConfig.REST_API_SERVER+"/users/delete?id="+id);
  }

  //Roles
  public getAllRoles():any{
    return this.http.get<any>(this.apiConfig.REST_API_SERVER+"/listRoles");
  }
  //Produit
  public getAllProduit():any{
    return this.http.get<any>(this.apiConfig.REST_API_SERVER+"/produits");
  }
  public addProduit(produit:any):any{
    return this.http.post<any>(this.apiConfig.REST_API_SERVER+"/produits/add",produit);
  }
  public updateProduit(produit:any,id:number):any{
    return this.http.put<any>(this.apiConfig.REST_API_SERVER+"/produits/update/"+id,produit);
  }
  public deleteProduit(id:number):any{
    return this.http.get<any>(this.apiConfig.REST_API_SERVER+"/produits/delete?id="+id);
  }
  //Commande
  public getAllCommande():any{
    return this.http.get<any>(this.apiConfig.REST_API_SERVER+"/commandes");
  }
  public getAllCommandeByDate(dd:any,df:any):any{
    return this.http.get<any>(this.apiConfig.REST_API_SERVER+"/commandes/date?dd="+dd+"&df="+df);
  }
  public addCommande(produit:any):any{
    return this.http.post<any>(this.apiConfig.REST_API_SERVER+"/commandes/add",produit);
  }
  public updateCommande(produit:any,id:number):any{
    return this.http.put<any>(this.apiConfig.REST_API_SERVER+"/commandes/update/"+id,produit);
  }
  public getAllProduitCommandeByCommande(id:number):any{
    return this.http.get<any>(this.apiConfig.REST_API_SERVER+"/commandes/produit?id="+id);
  }
  public deleteCommande(id:number):any{
    return this.http.get<any>(this.apiConfig.REST_API_SERVER+"/commandes/delete?id="+id);
  }


  saveToken(jwt): void{
    localStorage.setItem('token', jwt.accessToken);
    localStorage.setItem('authorities', jwt.authorities);
    localStorage.setItem('username', jwt.username);
  }
}
