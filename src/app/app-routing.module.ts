import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HelloWorldComponent} from './hello-world/hello-world.component';
import {CreateItemComponent} from './create-item/create-item.component';
import {ItemWallComponent} from './item-wall/item-wall.component';
import {UserRegistrationComponent} from './user-registration/user-registration.component';
import {LoginComponent} from './login/login.component';
import {RouteGuardService} from './route-guard.service';

const routes: Routes = [
  {path: 'hello-world', component: HelloWorldComponent},
  {path: 'item', component: CreateItemComponent, canActivate: [RouteGuardService]},
  {path: 'wall', component: ItemWallComponent, canActivate: [RouteGuardService]},
  {path: 'register', component: UserRegistrationComponent},
  {path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
