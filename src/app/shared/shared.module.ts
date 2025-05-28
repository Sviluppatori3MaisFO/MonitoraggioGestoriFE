import { NgModule } from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { HeaderComponent } from './components/header/header.component';
import {SafeHtmlPipe} from './pipes/safe-html.pipe';
import {NgxEchartsModule} from 'ngx-echarts';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { SpinnerComponent } from './components/ngx-spinner/spinner.component';
import {NgxSpinnerComponent} from 'ngx-spinner';
import { SwitchComponent } from './components/switch/switch.component';
import { UiSwitchModule } from 'ngx-ui-switch';
import {DatePickerModule} from 'primeng/datepicker';
import { SelectButtonModule } from 'primeng/selectbutton';
import {IftaLabelModule} from 'primeng/iftalabel';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts'),
    }),
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerComponent,
    UiSwitchModule,
    DatePickerModule,
    SelectButtonModule,
    IftaLabelModule,
  ],
  exports: [
    CommonModule,
    TranslateModule,
    SideBarComponent,
    HeaderComponent,
    SpinnerComponent,
    SafeHtmlPipe,
    FormsModule,
    ReactiveFormsModule,
    UiSwitchModule,
    SwitchComponent,
    DatePickerModule,
    SelectButtonModule,
    IftaLabelModule,
  ],
  declarations: [
    SideBarComponent,
    HeaderComponent,
    SafeHtmlPipe,
    SpinnerComponent,
    SwitchComponent,
  ],
  providers: [DatePipe]
})
export class SharedModule { }
