import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlusComponent } from './plus.component';

import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { PlusRoutingModule } from './plus-routing.module';


@NgModule({
  declarations: [
    PlusComponent
  ],
  imports: [
    CommonModule,
    NgbCarouselModule,
    PlusRoutingModule
  ]
})
export class PlusModule { }
