import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { TokenStorageService } from './token-storage.service';
import { UserProfil } from '../models/user-profil';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public host:string="http://localhost:8080/auth/token";

  public userProfile : UserProfil | null =null;
  public ts:number=0;

  constructor(private http:HttpClient,tokenStorage:TokenStorageService) { }

  public login(username : string, password : string):Observable<any>{
    let options= {
      headers: new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded')
    }
    let params=new HttpParams()
      .set("grantType","password")
      .set('username',username)
      .set('password',password)
      .set('withRefreshToken',true)
    return this.http.post(`${this.host}`, params,options);
  }

  public authenticateUser(idToken : any){
    let jwtHelperService=new JwtHelperService();
    let accessToken=idToken['accessToken'];
    let refreshToken = idToken['refreshToken'];
    let decodedJWTAccessToken = jwtHelperService.decodeToken(accessToken);

    this.userProfile= {
      username : decodedJWTAccessToken.sub,
      scope : decodedJWTAccessToken.scope,
      accessToken : accessToken,
      refreshToken:refreshToken,
    }

    localStorage.setItem('userProfile',JSON.stringify(this.userProfile));
  }

  public refreshToken(refreshToken:string){
    let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };

    let params = new HttpParams()
      .set("grantType", "refreshToken")
      .set("refreshToken",this.userProfile!.refreshToken)
      .set('withRefreshToken',true)
    return this.http.post(this.host+"/public/auth?rt", params,options)
  }
  logout(){
    this.userProfile=null;
    localStorage.removeItem("userProfile");
    window.location.href="/"
  }

  isAuthenticated() {
    let test = localStorage.getItem('userProfile');
    let userP;
    if(test!==null)
    userP = JSON.parse(test);
    console.log(userP.username)
    return this.userProfile!=null;
    //return localStorage.getItem('userProfile')!=null
  }

  public hasRole(role : string) :boolean{
    if(!this.userProfile) return false;
    console.log(this.userProfile.scope);
    console.log(role);
    console.log(this.userProfile.scope.includes(role));
    return this.userProfile.scope.includes(role);
  }
}
