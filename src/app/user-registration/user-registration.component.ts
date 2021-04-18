import { Component, OnInit } from '@angular/core';
import {UserService} from '../user.service';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {RoleService} from '../role.service';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css']
})
export class UserRegistrationComponent implements OnInit {
  requestUserDto: RequestUserDto = {
    username: '',
    password: '',
    confirmPassword: '',
    roleName: ''
  };

  roles: Role[] = [];

  constructor(private userService: UserService,
              private roleService: RoleService,
              private route: Router,
              private toastr: ToastrService) {}

  ngOnInit(): void {
    this.roleService.getRoles().subscribe((roleResponse) => {
      roleResponse.forEach( roleResponseElement => this.roles.push(roleResponseElement));
    });
  }

  register(): void {
    if (this.requestUserDto.password !== this.requestUserDto.confirmPassword) {
      this.toastr.error('Password and confirm password are not identical');
    } else {
    this.userService.create(this.requestUserDto).subscribe( (data) => {
       this.route.navigate(['/login']);
    }, error => {
       this.toastr.error(JSON.stringify(error));
    });
    }
  }
}

export interface RequestUserDto {
  username: string;
  password: string;
  confirmPassword: string;
  roleName: string;
}

export interface Role {
  role: string;
}

