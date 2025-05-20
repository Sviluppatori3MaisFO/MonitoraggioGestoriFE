import { Component } from '@angular/core';
import {SpinnerService} from '../spinner.service';

@Component({
  selector: 'app-total-spinner',
  standalone: false,
  templateUrl: './total-spinner.component.html',
  styleUrl: './total-spinner.component.scss'
})
export class TotalSpinnerComponent {

  constructor(private spinnerService: SpinnerService) {

  }
  get isShow() {
    return this.spinnerService.showTotalSpinner;
  }
}
