import {Component, OnInit} from '@angular/core';
import {GestoriService} from '../../../../services/gestori.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {ActivatedRoute} from '@angular/router';
import {IGestoreUltimoImportazione} from '../../../../services/models/gestori.model';
import {Editor, toHTML, Toolbar} from 'ngx-editor';
import { toZonedTime } from 'date-fns-tz';


@Component({
  selector: 'app-import-flussi',
  standalone: false,
  templateUrl: './import-flussi.component.html',
  styleUrl: './import-flussi.component.scss'
})
export class ImportFlussiComponent implements OnInit {

  public idGestore: number | null = null;
  public movimentio: IGestoreUltimoImportazione | null = null;
  public note: string = '';

  stateOptions: any[] = [{ label: 'NO', value: 0 },{ label: 'SI', value: 1 }];
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

  constructor(private gestoriService: GestoriService,
              private spinner: NgxSpinnerService,
              private aRoute: ActivatedRoute,) {
  }

  ngOnInit() {
    this.aRoute.paramMap.subscribe(params => {
      const id = params.get('id_gestore');
      if (id !== null) {
        this.idGestore = Number(id);
        this.getUltimaImportazione()
      }
    });
  }

  public getUltimaImportazione() {
    if (this.idGestore === null) return;

    this.spinner.show('import-flussi-spinner');
    this.gestoriService.getUltimaImportazione(this.idGestore).subscribe({
      next: data => {
        if(data == null) {

          let today = new Date();
          this.movimentio = {
            idGestore: this.idGestore?this.idGestore:0,
            idImportazioneGestore: 0,
            dsGestore: '',
            fgImportSS: 0,
            fgImportMM: 0,
            note: '',
            dtImportMM: today,
            dtImportSS: today
          };
        }

        this.movimentio = data;
        this.note = data.note!= null ? data.note : '';

        this.movimentio.dtImportMM = new Date(this.movimentio.dtImportMM);
        if(this.movimentio.dtImportSS)
          this.movimentio.dtImportSS = new Date(this.movimentio.dtImportSS);

        this.spinner.hide('import-flussi-spinner');
      },
      error: err => {
        console.error(err);
        this.spinner.hide('import-flussi-spinner');
      }
    })
  }

  public save () {
    if(!this.movimentio) return;
    if (this.movimentio && this.idGestore != null) {
      this.movimentio.idGestore = this.idGestore
    }
    this.movimentio.note = this.note;

    console.log(this.movimentio);
    this.gestoriService.addNewImportazione(this.movimentio).subscribe({
      next: data => {
        if(data) {
          this.getUltimaImportazione()
        }
      },
      error: err => {
        console.error(err);
      }
    })
  }

  private stripTime(date: Date): Date {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  }


  }
