// Required for Angular
import { Component, OnInit } from '@angular/core';
import {AuthService} from './auth/auth.service';
import {LanguageService} from './shared/services/language.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private langService: LanguageService
  ) {
    this.authService.init()
  }

  ngOnInit(): void {}
}
