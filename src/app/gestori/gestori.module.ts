import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GestoriRoutingModule } from './gestori-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { GestoreDashboardComponent } from './dashboard/gestore-dashboard/gestore-dashboard.component';

@NgModule({
  declarations: [
    DashboardComponent,
    GestoreDashboardComponent
  ],
  imports: [
    CommonModule,
    GestoriRoutingModule,
    TranslateModule,
  ]
})
export class GestoriModule {}
