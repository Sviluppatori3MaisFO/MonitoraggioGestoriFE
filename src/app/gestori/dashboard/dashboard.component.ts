import {Component, OnInit} from '@angular/core';
import {NgxSpinnerService} from 'ngx-spinner';
import {GestoriService} from '../../services/gestori.service';
import {IGestoreMonitorato} from '../../services/models/gestori.model';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit{

  public gestori: IGestoreMonitorato[] = [];

  constructor(private spinner: NgxSpinnerService,
              private gestoriService: GestoriService,) {
  }

  ngOnInit() {
    this.getGestoriMonitorati();
  }

  private getGestoriMonitorati () {
    this.spinner.show('spinnerTableDashboardGestori');
    this.gestoriService.getAnGestoriMonitorati().subscribe({
      next: res => {
        this.gestori = res
        this.spinner.hide('spinnerTableDashboardGestori');
      },
      error: err => {
        console.error(err);
        this.spinner.hide('spinnerTableDashboardGestori');
      }
    })

  }

  async isSpinnerVisible(): Promise<boolean> {
    const spinnerRef = await this.spinner.getSpinner('spinnerTableDashboardGestori').toPromise();
    return !!spinnerRef?.show;
  }

  public dateCompare(date_mm?: Date, date_cedis?: Date): boolean {
    if (!date_mm || !date_cedis) return false;

    const d1 = new Date(date_mm);
    const d2 = new Date(date_cedis);

    //return d1.getDate() === d2.getDate() && d1.getMonth() === d2.getMonth();
    return d1.getMonth() === d2.getMonth();
  }


}
