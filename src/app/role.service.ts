import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Role} from './user-registration/user-registration.component';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  API_PATH = 'http://localhost:8080/roles';

  constructor(private httpClient: HttpClient) { }

  getRoles(): Observable<Role[]> {
    return this.httpClient.get<Role[]>(this.API_PATH);
  }
}
