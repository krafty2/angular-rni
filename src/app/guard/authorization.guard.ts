import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationGuard {

  constructor(private authService:AuthService, private router : Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(this.authService.isAuthenticated()){
       
        let routeRoles=route.data['roles'];
        if(routeRoles=="*") return true;
        let authorized:boolean=false;

        for (let role of routeRoles){
          let hasRole:boolean=this.authService.hasRole(role);
          if(hasRole){
            authorized=true;
            break;
          }
        }
        if(authorized==false) alert("Not Authorized");
        return authorized;
        //return true;
      } else {
        console.log(this.authService.isAuthenticated());
        this.router.navigateByUrl("/login");
        return false;
      }
  }
  
}
