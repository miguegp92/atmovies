import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [

  {
    path: 'home',
    loadChildren: () =>
      import('./pages/home/home.module').then(
        m => m.HomeModule
      )
  }, {
    path: 'movies',
    loadChildren: () =>
      import('./pages/movies-component/movies.module').then(
        m => m.MoviesModule
      )
  },
  // {
  //   path: 'unresolved',
  //   loadChildren: () =>
  //     import('./pages/unresolved/unresolved.module').then(
  //       m => m.UnresolvedModule
  //     )
  // },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'unresolved'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
