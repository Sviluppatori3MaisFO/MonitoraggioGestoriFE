import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GestoriRoutingModule } from './gestori-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { GestoreDashboardComponent } from './dashboard/gestore-dashboard/gestore-dashboard.component';
import { ImportFlussiComponent } from './dashboard/gestore-dashboard/import-flussi/import-flussi.component';
import {NgxSpinnerComponent} from 'ngx-spinner';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  declarations: [
    DashboardComponent,
    GestoreDashboardComponent,
    ImportFlussiComponent
  ],
  imports: [
    CommonModule,
    GestoriRoutingModule,
    TranslateModule,
    NgxSpinnerComponent,
    SharedModule,
  ]
})
export class GestoriModule {}
