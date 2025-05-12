import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlusComponent } from './plus.component';

const routes: Routes = [
  {
    path: '',
    component: PlusComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlusRoutingModule {}
