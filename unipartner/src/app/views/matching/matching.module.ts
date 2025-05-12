import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatchingRoutingModule } from './matching-routing.module';
import { MatchingComponent } from './matching.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    MatchingComponent
  ],
  imports: [
    CommonModule,
    MatchingRoutingModule,
    ReactiveFormsModule
  ]
})
export class MatchingModule { }
