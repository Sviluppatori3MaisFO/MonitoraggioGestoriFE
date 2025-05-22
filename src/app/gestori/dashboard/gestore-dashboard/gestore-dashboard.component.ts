import {Component, OnInit} from '@angular/core';
import {GestoriService} from '../../../services/gestori.service';
import {ActivatedRoute} from '@angular/router';
import {IGestoreMonitorato} from '../../../services/models/gestori.model';

@Component({
  selector: 'app-gestore-dashboard',
  standalone: false,
  templateUrl: './gestore-dashboard.component.html',
  styleUrl: './gestore-dashboard.component.scss'
})
export class GestoreDashboardComponent implements OnInit {

  private idGestore: number = 0;
  public gestore: IGestoreMonitorato | null = null;

  constructor(private aRoute: ActivatedRoute,private gestoriService: GestoriService,) { }

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
    this.gestoriService.getGestoreMonitoratoByIdGestore(idGestore).subscribe({
      next: res => {
        console.log(res);
        this.gestore = res;
      },
      error: err => {
        console.error(err);
      }
    })
  }
}
