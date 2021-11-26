import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './main-layout-routing.module';
import { HomeComponent } from './home/home.component';
import { VetComponent } from './vet/vet.component';
import { NavComponent } from 'src/app/modules/main-layout/nav/nav.component';

@NgModule({
  declarations: [
    HomeComponent,
    VetComponent,
    NavComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
  ]
})
export class PagesModule { }
