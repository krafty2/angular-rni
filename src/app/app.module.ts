import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgxPaginationModule } from 'ngx-pagination';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RniModule } from './rni/rni.module';
import { LoginComponent } from './login/login.component';
import { JwtInterceptorService } from './service/jwt-interceptor.service';
import { NavbarComponent } from './rni/navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxPaginationModule,
    RniModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [{provide:HTTP_INTERCEPTORS,useClass:JwtInterceptorService,multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
