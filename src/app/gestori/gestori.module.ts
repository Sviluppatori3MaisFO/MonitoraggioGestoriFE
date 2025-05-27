import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GestoriRoutingModule } from './gestori-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { GestoreDashboardComponent } from './dashboard/gestore-dashboard/gestore-dashboard.component';
import { ImportFlussiComponent } from './dashboard/gestore-dashboard/import-flussi/import-flussi.component';
import {NgxSpinnerComponent} from 'ngx-spinner';
import {SharedModule} from '../shared/shared.module';
import {NgxEchartsDirective} from 'ngx-echarts';
import { EditGestoreComponent } from './dashboard/gestore-dashboard/edit-gestore/edit-gestore.component';
import {QuillModule} from 'ngx-quill';
import {NgxEditorModule} from 'ngx-editor';

@NgModule({
  declarations: [
    DashboardComponent,
    GestoreDashboardComponent,
    ImportFlussiComponent,
    EditGestoreComponent
  ],
  imports: [
    CommonModule,
    GestoriRoutingModule,
    TranslateModule,
    NgxSpinnerComponent,
    SharedModule,
    NgxEchartsDirective,
    NgxEditorModule,
  ]
})
export class GestoriModule {}
