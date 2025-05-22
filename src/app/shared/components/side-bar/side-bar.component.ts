import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../../auth/auth.service';
import {GestoriService} from '../../../services/gestori.service';
import {IGestoreMonitorato} from '../../../services/models/gestori.model';

@Component({
  selector: 'app-side-bar',
  standalone: false,
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.scss'
})
export class SideBarComponent implements OnInit {

  public gestori: IGestoreMonitorato[] = [];

  constructor(public router: Router,
              private gestoriService: GestoriService,
              public authService: AuthService,) {

  }

  ngOnInit() {
    this.gestoriService.getAnGestoriMonitorati().subscribe({
      next: res => {
        this.gestori = res
        console.log(this.gestori)
      },
      error: err => {
        console.error(err);
      }
    })
  }

  public onGestore(id_Gestore: number | null) {
    if (id_Gestore === null)
      this.router.navigate(['/gestori//dashboard']);
    else
      this.router.navigate(['/gestori//dashboard/'+id_Gestore]);
  }

  logout() {
    this.authService.logout();
  }
}
