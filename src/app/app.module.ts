import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HelloWorldComponent } from './hello-world/hello-world.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {CreateItemComponent } from './create-item/create-item.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatOptionModule} from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {MatListModule} from '@angular/material/list';
import {ToastrModule} from 'ngx-toastr';
import {ItemDeleteDialogComponent, ItemDescriptionDialogComponent, ItemWallComponent} from './item-wall/item-wall.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {MatDialogModule} from '@angular/material/dialog';
import { MatIconModule} from '@angular/material/icon';
import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { LoginComponent } from './login/login.component';
import {AuthInterceptorService} from './auth-interceptor.service';
import { NavigationComponent } from './navigation/navigation.component';
import {MatToolbarModule} from '@angular/material/toolbar';

@NgModule({
  declarations: [
    AppComponent,
    HelloWorldComponent,
    CreateItemComponent,
    ItemWallComponent,
    ItemDescriptionDialogComponent,
    ItemDeleteDialogComponent,
    UserRegistrationComponent,
    LoginComponent,
    NavigationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatOptionModule,
    MatSelectModule,
    MatListModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    DragDropModule,
    MatDialogModule,
    MatIconModule,
    MatToolbarModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
