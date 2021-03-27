import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HelloWorldComponent} from './hello-world/hello-world.component';
import {CreateItemComponent} from './create-item/create-item.component';

const routes: Routes = [
  {path: 'hello-world', component: HelloWorldComponent},
  {path: 'item', component: CreateItemComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
