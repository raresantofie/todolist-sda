import { Component, OnInit } from '@angular/core';
import {AuthorizationService} from '../authorization.service';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username = '';
  password = '';

  constructor(private authService: AuthorizationService, private router: Router, private toast: ToastrService) { }

  ngOnInit(): void {
  }

  doLogin(): void {
    this.authService.doAuth(this.username, this.password).subscribe( (data) => {
      localStorage.setItem(AuthorizationService.LOGGED_USERNAME, this.username);
      this.router.navigate(['/item']);
    }, error => {
      console.log('Something went wrong');
    });
  }
}
