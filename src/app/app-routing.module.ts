import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MsalGuard } from '@azure/msal-angular';
import {DashboardComponent} from './dashboard/dashboard.component';


const routes: Routes = [
  {
    path: '**',
    component: DashboardComponent,
    canActivate: [MsalGuard]
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
