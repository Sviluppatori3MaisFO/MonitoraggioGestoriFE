import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  constructor() { }

  public showTotalSpinner: boolean = true;

}
