import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsersComponent } from './modules/users/users.component';
import { UserAddEditComponent } from './modules/users/components/user-add-edit/user-add-edit.component';
import { UserListComponent } from './modules/users/components/user-list/user-list.component';
import { FormatAddressPipe } from './pipes/format-address.pipe';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    UsersComponent,
    UserAddEditComponent,
    UserListComponent,
    FormatAddressPipe
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
