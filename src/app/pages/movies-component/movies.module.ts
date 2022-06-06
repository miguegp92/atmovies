import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoviesComponent } from './movies-component.component';
import { MoviesRoutingModule } from './movies-routing.module';
import { MoviesService } from './movies.service';
import {MatCardModule } from '@angular/material/card'


@NgModule({
  declarations: [MoviesComponent],
  imports: [
    CommonModule,
    MoviesRoutingModule,
    MatCardModule
  ], 
  providers: [MoviesService]
})
export class MoviesModule { }
