import { Component, OnInit } from '@angular/core';
import {AuthorizationService} from '../authorization.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  logout(): void {
    localStorage.removeItem(AuthorizationService.AUTH_HEADER);
    localStorage.removeItem(AuthorizationService.LOGGED_USERNAME);
    this.router.navigate(['/login']);
  }

}
