import { NgModule } from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { HeaderComponent } from './components/header/header.component';
import {SafeHtmlPipe} from './pipes/safe-html.pipe';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,

  ],
  exports: [
    CommonModule,
    TranslateModule,
    SideBarComponent,
    HeaderComponent,
    SafeHtmlPipe
  ],
  declarations: [
    SideBarComponent,
    HeaderComponent,
    SafeHtmlPipe
  ],
  providers: [DatePipe]
})
export class SharedModule { }
