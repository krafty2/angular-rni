import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { TokenStorageService } from '../service/token-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  loginFormGroup! : FormGroup;
  idToken : any;
  errorMessage :any;

  constructor(private fb:FormBuilder,private authService:AuthService,private router:Router){}
  ngOnInit(): void {
    this.loginFormGroup=this.fb.group({
      username : this.fb.control(''),
      password : this.fb.control('')
    });
  }

  handleLogin(){

    this.errorMessage=undefined;
    let username=this.loginFormGroup.value.username;
    let password=this.loginFormGroup.value.password;
    this.authService.login(username,password).subscribe({
      next: response => {
        this.idToken = response;
        this.authService.authenticateUser(this.idToken);
        this.router.navigate(["/lieux"]);
      },
      error :err => {
        this.errorMessage = err.error.errorMessage;
      }
    })

  }
}
