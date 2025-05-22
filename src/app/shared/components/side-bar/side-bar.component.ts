import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../../auth/auth.service';
import {GestoriService} from '../../../services/gestori.service';
import {IGestoreMonitorato} from '../../../services/models/gestori.model';
import {LanguageService} from '../../services/language.service';

@Component({
  selector: 'app-side-bar',
  standalone: false,
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.scss'
})
export class SideBarComponent implements OnInit {

  public openSettings : boolean = false;
  public gestori: IGestoreMonitorato[] = [];
  get username () {
    return this.authService.account?.name;
  }

  constructor(public router: Router,
              private gestoriService: GestoriService,
              public authService: AuthService,
              private langService: LanguageService) {

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
}
