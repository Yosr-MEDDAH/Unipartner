import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserLayoutComponent } from './user-layout/user-layout.component';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { AuthAdminLayoutComponent } from './auth-admin-layout/auth-admin-layout.component';
import { BrowserModule } from '@angular/platform-browser';



@NgModule({
  declarations: [
    UserLayoutComponent,
    AdminLayoutComponent,
    AuthAdminLayoutComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class LayoutsModule { }
