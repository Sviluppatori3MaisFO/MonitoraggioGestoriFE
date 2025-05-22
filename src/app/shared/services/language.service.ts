import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  private supportedLangs = ['en', 'it', 'fr'];

  constructor(private translate: TranslateService) {
  }

  init() {
    this.translate.addLangs(this.supportedLangs);
    this.translate.setDefaultLang('it');

  }

  useLang(lang: string | null) {
    const selectedLang = this.supportedLangs.includes(lang || '') ? lang! : 'it';
    this.translate.use(selectedLang);
  }

  getCurrentLang(): string {
    return this.translate.currentLang || this.translate.defaultLang;
  }

  getSupportedLangs(): string[] {
    return this.supportedLangs;
  }
}
