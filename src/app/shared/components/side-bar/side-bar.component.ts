import { Component } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-side-bar',
  standalone: false,
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.scss'
})
export class SideBarComponent {

  constructor(public router: Router) { }

  public onGestore(id_Gestore: number) {
    console.log(id_Gestore);
    this.router.navigate(['/gestori//dashboard/'+id_Gestore]);
  }
}
