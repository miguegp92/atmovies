import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MoviesDetailComponent } from './detail/movies-detail.component';
import { MoviesComponent } from './main/movies-component.component';
import { MoviesActionComponent } from './movies-action/movies-action/movies-action.component';

const routes: Routes = [
  {
    path: '', component: MoviesComponent
  }, {
    path: 'add', component: MoviesActionComponent
  }, {
    path: 'edit/:id', component: MoviesActionComponent
  }, {
    path: ':id', component: MoviesDetailComponent
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MoviesRoutingModule { }
