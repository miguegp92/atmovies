import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { HomeRoutingModule } from './home-routing.module';
import { HomePage } from './home.component';
// import { CoreModule } from 'src/app/core/core.module';


@NgModule({
  declarations: [HomePage],
  imports: [
    HomeRoutingModule,
    CommonModule
    // CoreModule,
  ]
})
export class HomeModule { }
