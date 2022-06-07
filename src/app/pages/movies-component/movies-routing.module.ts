import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MoviesDetailComponent } from './detail/movies-detail.component';
import { MoviesComponent } from './main/movies-component.component';

const routes: Routes = [
  {
    path: '', component: MoviesComponent
  }, {
    path: ':id', component: MoviesDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MoviesRoutingModule { }
