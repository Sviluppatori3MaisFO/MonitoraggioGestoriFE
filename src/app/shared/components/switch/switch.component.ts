import {Component, EventEmitter, Input, Output} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-switch',
  standalone: false,
  templateUrl: './switch.component.html',
  styleUrl: './switch.component.scss'
})
export class SwitchComponent {
  @Input() myProp: number = 0;
  @Output()
  myPropChange = new EventEmitter<number>();

  public lb1: string = '';
  public lb2: string = '';

  constructor(private translateService: TranslateService) {
    if(this.lb1 === '') {
      this.lb1 = this.translateService.instant('NO');
    }
    if(this.lb2 === '') {
      this.lb2 = this.translateService.instant('SI');
    }
  }

  onToggle () {
    if(this.myProp == 0)
      this.myProp = 1;
    else
      this.myProp = 0;

    this.myPropChange.emit(this.myProp);
  }
}
