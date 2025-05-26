import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MsalGuard } from '@azure/msal-angular';
import {GestoreDashboardComponent} from './dashboard/gestore-dashboard/gestore-dashboard.component';
import {EditGestoreComponent} from './dashboard/gestore-dashboard/edit-gestore/edit-gestore.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [MsalGuard]
  },
  {
    path: 'dashboard/:id_gestore',
    component: GestoreDashboardComponent,
    canActivate: [MsalGuard]
  },
  {
    path: 'dashboard/:id_gestore/edit',
    component: EditGestoreComponent,
    canActivate: [MsalGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GestoriRoutingModule {}
