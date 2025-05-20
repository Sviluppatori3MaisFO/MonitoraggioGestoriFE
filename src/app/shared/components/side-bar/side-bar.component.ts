import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../../auth/auth.service';

@Component({
  selector: 'app-side-bar',
  standalone: false,
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.scss'
})
export class SideBarComponent implements OnInit {


  constructor(public router: Router,
              public authService: AuthService,) {

  }

  ngOnInit() {
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

  togggleTheme(){
    if(document.body.getAttribute('data-theme') == 'light')
      document.body.setAttribute('data-theme', 'dark');
    else
      document.body.setAttribute('data-theme', 'light');
  }
}
