import { AfterViewInit, Component, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, interval } from 'rxjs';
declare var M:any
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements AfterViewInit{

  role:any;
  admin:boolean=false;
  constructor(private router: Router,private ngZone:NgZone) { }
  ngAfterViewInit(): void {
    this.roles.subscribe(
      
      );
      var elems = document.addEventListener('DOMContentLoaded', function () {
        var elems = document.querySelectorAll('.dropdown-trigger');
        var options = {
          constrainWidth: false,
          inDuration: 500
        }
        M.Dropdown.init(elems, options);
      });
  
      document.addEventListener('DOMContentLoaded', function () {
        var elems = document.querySelectorAll('.sidenav');
        var instances = M.Sidenav.init(elems);
      });
  
      //
      const bouton = document.getElementById('test');
      bouton?.addEventListener('click',()=>{
        this.ngZone.run(()=>{
          console.log("Button clicker");
        })
      })
  }

  title = 'irt-app';

  onRouterLinkClick() {
    this.router.navigate(['/lieux']);
    //location.reload();
  }

  roles = new Observable((observer)=>{
    let test = localStorage.getItem('userProfile');
    let userP;
    if(test!==null)
    userP = JSON.parse(test);
    this.role = userP.scope;

    if(this.role.includes("ADMIN")){
      this.admin=true;
      console.log("valeur d'admin" + this.admin)
    }
    observer.next(interval(100))
  })
}
