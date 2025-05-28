import {Component, OnInit} from '@angular/core';
import {GestoriService} from '../../../services/gestori.service';
import {ActivatedRoute, Router} from '@angular/router';
import {IGestoreImportazioneMovimentiChart, IGestoreMonitorato} from '../../../services/models/gestori.model';
import {NgxSpinnerService} from 'ngx-spinner';
import {EChartsOption} from 'echarts';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-gestore-dashboard',
  standalone: false,
  templateUrl: './gestore-dashboard.component.html',
  styleUrl: './gestore-dashboard.component.scss'
})
export class GestoreDashboardComponent implements OnInit {

  chartOpt: EChartsOption = {

    legend: {
      itemGap: 30,
    },
    tooltip: {
      trigger: 'axis'
    },
    xAxis: {
      data: [],
    },
    yAxis: {},
    series: [
      {
        name: 'Count',
        type: 'line',
        data: [],
      },
      {
        name: 'Count',
        type: 'line',
        data: [],
      },
    ],
  };

  public days: string[] = ['DOMENICA', 'LUNEDÌ', 'MARTEDÌ', 'MERCOLEDÌ', 'GIOVEDÌ', 'VENERDÌ', 'SABATO']
  private idGestore: number = 0;
  public gestore: IGestoreMonitorato | null = null;
  public movimentiChart: IGestoreImportazioneMovimentiChart[] | null = null;

  constructor(private aRoute: ActivatedRoute,
              private gestoriService: GestoriService,
              private spinner: NgxSpinnerService,
              private router: Router,
              private translate: TranslateService,) { }

  ngOnInit() {
    this.aRoute.paramMap.subscribe(params => {
      const id = params.get('id_gestore');
      if (id !== null) {
        this.idGestore = +id;
        this.getGestoreMonitorato(this.idGestore);
        this.getQuantitaGestoriChart(this.idGestore);
      }
    });
  }

  private getGestoreMonitorato(idGestore: number) {
    this.spinner.show('spinnerLoadDatiGestore');
    this.gestore = null;
    this.gestoriService.getGestoreMonitoratoByIdGestore(idGestore).subscribe({
      next: res => {
        this.gestore = res;
        this.spinner.hide('spinnerLoadDatiGestore');
      },
      error: err => {
        console.error(err);
        this.spinner.hide('spinnerLoadDatiGestore');
      }
    })
  }
  private getQuantitaGestoriChart (idGestore: number) {

    this.spinner.show('spinnerLoadDatiGestore');
    this.gestore = null;
    this.gestoriService.getQuantitaGestoriChart(idGestore).subscribe({
      next: res => {
        this.movimentiChart = res;
        this.initChartData();
        this.spinner.hide('spinnerLoadDatiGestore');
      },
      error: err => {
        console.error(err);
        this.spinner.hide('spinnerLoadDatiGestore');
      }
    })
  }
  private initChartData() {
    if(!this.movimentiChart) return

    this.chartOpt.xAxis = {
      type: 'category',
      name: this.translate.instant('DATE'),
      nameLocation: 'middle',
      nameGap: 20,
      data: this.movimentiChart.map(itm => {
        const rawDate = itm.dtImportazione || itm.dtImportazione;
        const parsedDate = new Date(rawDate);
        return isNaN(parsedDate.getTime())
          ? 'Data non valida'
          : parsedDate.toLocaleDateString('it-IT');
      }),
    };

    this.chartOpt.series = [
      {
        type: 'line',
        name: this.translate.instant('MOVIMENTI_SETTIMANALI'),
        data: this.movimentiChart.map(itm => itm.valueSettimanali),
      },
      {
        type: 'line',
        name: this.translate.instant('MOVIMENTI_MENSILI'),
        data: this.movimentiChart.map(itm => itm.valueDefinitivi),
      },
    ];

  }

  public reloadData() {
    this.getGestoreMonitorato(this.idGestore);
    this.getQuantitaGestoriChart(this.idGestore);
  }

  /**
   * REGION DATA
   */
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
    return this.days[new Date().getDay()] ?? '-';

  }
  getDay (day?: number) {
    if(!day) return '-';
    return this.days[day-1]
  }
  onEdit() {
    this.router.navigate(['/gestori/dashboard', this.idGestore, 'edit']);
  }
}
