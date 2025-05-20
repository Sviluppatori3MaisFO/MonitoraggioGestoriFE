import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'gestori',
    loadChildren: () => import('./gestori/gestori.module').then(m => m.GestoriModule)
  },
  {
    path: '',
    redirectTo: 'gestori/dashboard',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'gestori/dashboard'
  }
];



// Create an NgModule that contains all the directives for the routes specified above
@NgModule({
  imports: [RouterModule.forRoot(routes, {
    useHash: false
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
