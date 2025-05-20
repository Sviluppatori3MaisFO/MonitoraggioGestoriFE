import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { HeaderComponent } from './components/header/header.component';
import { TotalSpinnerComponent } from './components/spinner/total-spinner/total-spinner.component';

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
  ],
  declarations: [
    SideBarComponent,
    HeaderComponent,
    TotalSpinnerComponent
  ]
})
export class SharedModule { }
