import {Component, Input} from '@angular/core';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-spinner',
  standalone: false,
  templateUrl: './spinner.component.html',
  styleUrl: './spinner.component.scss'
})
export class SpinnerComponent {

  @Input() name: string = '';
  @Input() fullScreen: boolean = false;
  @Input() active: boolean = false;

  constructor(private spinnerService: NgxSpinnerService) {
    this.spinnerService.show();
  }

  public show(name: string = ''): void {
    this.spinnerService.show(name || this.name);
  }

  public hide(name: string = ''): void {
    this.spinnerService.hide(name || this.name);
  }
}
