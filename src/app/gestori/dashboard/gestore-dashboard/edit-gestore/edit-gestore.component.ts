import {Component, OnInit} from '@angular/core';
import {GestoriService} from '../../../../services/gestori.service';
import {ActivatedRoute, Router} from '@angular/router';
import {NgxSpinnerService} from 'ngx-spinner';
import {IGestoreMonitorato} from '../../../../services/models/gestori.model';
import {Location} from '@angular/common';
import {  Editor, Toolbar } from 'ngx-editor';

@Component({
  selector: 'app-edit-gestore',
  standalone: false,
  templateUrl: './edit-gestore.component.html',
  styleUrl: './edit-gestore.component.scss'
})
export class EditGestoreComponent implements OnInit {

  public idGestore: number = 0;
  public gestore: IGestoreMonitorato | null = null;
  public days: number[] = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31];
  public daysWeek: number[] = [1,2,3,4,5,6,7];
  editor: Editor = new Editor();
  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['link', 'image'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
  ];

  constructor(private gestoreService: GestoriService,
              private aRoute: ActivatedRoute,
              private spinner: NgxSpinnerService,
              private router: Router,
              private location: Location,) {

  }

  ngOnInit() {
    this.aRoute.paramMap.subscribe(params => {
      const id = params.get('id_gestore');
      if (id !== null) {
        this.idGestore = Number(id);
        this.getGestoreMonitorato(this.idGestore);
      }
    });
  }
  private getGestoreMonitorato(idGestore: number) {
    this.spinner.show('spinnerLoadDatiGestore');
    this.gestore = null;
    console.log(this.idGestore)

    this.gestoreService.getGestoreMonitoratoByIdGestore(idGestore).subscribe({
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

  public onDay(day: number): void {
    if (!this.gestore) return;

    // Aggiunge il giorno nel primo slot disponibile
    if (!this.gestore.dtArrivoFlussiMmD1) {
      this.gestore.dtArrivoFlussiMmD1 = day;
    } else if (!this.gestore.dtArrivoFlussiMmD2) {
      this.gestore.dtArrivoFlussiMmD2 = day;
    } else {
      // Se entrambi sono già settati, resetta entrambi
      this.gestore.dtArrivoFlussiMmD1 = 0;
      this.gestore.dtArrivoFlussiMmD2 = 0;
      return; // fine qui, per evitare confronto subito dopo
    }

    // Se entrambi sono presenti, assicurati che siano in ordine crescente
    if (
      this.gestore.dtArrivoFlussiMmD1 &&
      this.gestore.dtArrivoFlussiMmD2 &&
      this.gestore.dtArrivoFlussiMmD1 > this.gestore.dtArrivoFlussiMmD2
    ) {
      const temp = this.gestore.dtArrivoFlussiMmD1;
      this.gestore.dtArrivoFlussiMmD1 = this.gestore.dtArrivoFlussiMmD2;
      this.gestore.dtArrivoFlussiMmD2 = temp;
    }
  }

  public onDayWeek (day: number) {
    if(!this.gestore) return;
    this.gestore.dtArrivoFlussiSs = day;
  }
  public save() {
    if(!this.gestore) return;
    this.gestoreService.editGestoreMonitorato(this.gestore).subscribe({
      next: res => {
        this.location.back()
      },
      error: err => {
        console.error(err);
      }
    })
  }
  public closeEdit () {
    this.location.back();
  }

  test(eve: any){
    console.log(eve.checked);
  }
}
