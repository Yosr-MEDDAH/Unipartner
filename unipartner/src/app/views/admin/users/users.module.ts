import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  NO_ERRORS_SCHEMA } from '@angular/core';
import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    UsersComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    FormsModule,
    NgbModule
  ],
  schemas: [ NO_ERRORS_SCHEMA ]
})
export class UsersModule { }
