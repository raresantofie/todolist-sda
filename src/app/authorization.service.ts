import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {
  public static LOGGED_USERNAME = 'loggedUsername';
  public static AUTH_HEADER = 'authHeader';
  API_PATH = 'http://localhost:8080/logged-user';
  constructor(private httpClient: HttpClient) { }

  doAuth(username: string, password: string): Observable<any> {
    return this.httpClient.get(this.API_PATH, {
      headers: {
        Authorization: this.buildAuthorizationHeaders(username, password)
      }
    });
  }


  // Utilizatorul scrie in form user:test si password:test
  //
  //
  //
  //
  buildAuthorizationHeaders(username: string, password: string): string {
    const authHeader = 'Basic ' + btoa(username + ':' + password);
    localStorage.setItem(AuthorizationService.AUTH_HEADER, authHeader);
    return authHeader;
  }
}
