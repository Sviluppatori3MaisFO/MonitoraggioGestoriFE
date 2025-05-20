import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { SideBarComponent } from './components/side-bar/side-bar.component';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
  ],
  exports: [
    CommonModule,
    TranslateModule,
    SideBarComponent,
  ],
  declarations: [
    SideBarComponent
  ]
})
export class SharedModule { }
