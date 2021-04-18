import { Injectable } from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthorizationService} from './authorization.service';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor{

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const loggedUser: string | null = localStorage.getItem(AuthorizationService.LOGGED_USERNAME);
    const authHeader: string | null = localStorage.getItem(AuthorizationService.AUTH_HEADER);
    if (loggedUser && authHeader) {
      req = req.clone({
        setHeaders: {
          Authorization: authHeader
        }
      });
    }
    return next.handle(req);
  }
}
