import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { TokenStorageService } from './token-storage.service';
import { AuthService } from './auth.service';

const TOKEN_HEADER_KEY = 'Authorization';

@Injectable({
  providedIn: 'root'
})
export class JwtInterceptorService implements HttpInterceptor{

  constructor(private authService:AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authReq = req;
    let url=req.url;
    const token = this.authService.userProfile?.accessToken;
    if (token != null && !url.includes("/auth")) {
      authReq = this.addTokenHeader(req, token);
    }
    return next.handle(authReq);
  }

  private addTokenHeader(request: HttpRequest<any>, token: string) {
    return request.clone({ headers: request.headers.set(TOKEN_HEADER_KEY, "Bearer "+token) });
  }
}
