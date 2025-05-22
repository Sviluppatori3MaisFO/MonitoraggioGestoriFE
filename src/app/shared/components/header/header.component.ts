import { Component } from '@angular/core';
import {AuthService} from '../../../auth/auth.service';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {




  constructor(public authService: AuthService,) {
  }
}
