import {Component, OnInit} from '@angular/core';
import { Router} from '@angular/router';
import {AuthService} from '../../../auth/auth.service';
import {GestoriService} from '../../../services/gestori.service';
import {LanguageService} from '../../services/language.service';
import {UtilsService} from '../../../services/utils.service';
import {ISidebar} from '../../../services/models/utils.model';

@Component({
  selector: 'app-side-bar',
  standalone: false,
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.scss'
})
export class SideBarComponent implements OnInit {

  public openSettings : boolean = false;
  public gestori: ISidebar[] = [];
  public activeGestore: number | null  = null;

  get username () {
    return this.authService.account?.name;
  }

  constructor(public router: Router,
              private gestoriService: GestoriService,
              private utilsService: UtilsService,
              public authService: AuthService,
              private langService: LanguageService,) {

  }

  ngOnInit() {

    this.getAnGestoriMonitorati()
  }

  public getAnGestoriMonitorati() {
    this.utilsService.getSidebar().subscribe({
      next: res => {
        this.gestori = res;
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

  get langs() {
    return this.langService.getSupportedLangs();
  }
  get currentLanguage() {
    return this.langService.getCurrentLang()
  }

  toggleSettings() {
    this.openSettings = !this.openSettings;
  }
  changeLang(lang: string) {
    this.langService.useLang(lang)
  }
  public activeRoute() {
    const segments = this.router.url.split('/');
    const id = segments.find((seg, i) => segments[i - 1] === 'dashboard');
    return id ? +id : null;
  }
}
