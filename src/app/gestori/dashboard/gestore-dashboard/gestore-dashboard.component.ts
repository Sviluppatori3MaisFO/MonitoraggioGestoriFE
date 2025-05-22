import {Component, OnInit} from '@angular/core';
import {GestoriService} from '../../../services/gestori.service';
import {ActivatedRoute} from '@angular/router';
import {IGestoreMonitorato} from '../../../services/models/gestori.model';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-gestore-dashboard',
  standalone: false,
  templateUrl: './gestore-dashboard.component.html',
  styleUrl: './gestore-dashboard.component.scss'
})
export class GestoreDashboardComponent implements OnInit {

  private idGestore: number = 0;
  public gestore: IGestoreMonitorato | null = null;

  constructor(private aRoute: ActivatedRoute,
              private gestoriService: GestoriService,
              private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.aRoute.paramMap.subscribe(params => {
      const id = params.get('id_gestore');
      if (id !== null) {
        this.idGestore = +id;
        this.getGestoreMonitorato(this.idGestore);
      }
    });
  }

  private getGestoreMonitorato(idGestore: number) {
    this.spinner.show('spinnerLoadDatiGestore');
    this.gestore = null;
    this.gestoriService.getGestoreMonitoratoByIdGestore(idGestore).subscribe({
      next: res => {
        console.log(res);
        this.gestore = res;
        this.spinner.hide('spinnerLoadDatiGestore');
      },
      error: err => {
        console.error(err);
        this.spinner.hide('spinnerLoadDatiGestore');
      }
    })
  }


  // Limite arrivo gestori mensile
  get isMMLimit() {
    if(!this.gestore?.dtArrivoFlussiMmD1) return ''
    let today = new Date().getDate();
    // se il gg 2 non c'e' consideria d1 + 7
    let day2 = this.gestore?.dtArrivoFlussiMmD2? this.gestore?.dtArrivoFlussiMmD2 : this.gestore?.dtArrivoFlussiMmD1+7;
    if(this.gestore?.dtArrivoFlussiMmD1 <= today && day2 <= today)
      return 'warning-row'
    else if(day2 < today)
      return 'danger-row'
    else return ''
  }
  get todayMM() {
    return new Date().getDate();
  }
  // Mi dice se abbiamo gia superato i giorni della settimana previsti fa un +2 del gg
  get isSSOver() {
    if(!this.gestore?.dtArrivoFlussiSs) return ''
    let today = new Date().getDay();
    if(this.gestore?.dtArrivoFlussiSs >= today && this.gestore?.dtArrivoFlussiSs <= today+2)
      return 'warning-row'
    if(this.gestore?.dtArrivoFlussiSs < today+2)
      return 'danger-row'
    else return ''
  }
  get todaySS() {
    return new Date().getDay();
  }
}
