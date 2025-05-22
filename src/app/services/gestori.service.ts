import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {IAnGestore, IGestoreMonitorato} from './models/gestori.model';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GestoriService {

  constructor(private http: HttpClient) { }

  private apiUrl = environment.apiConfiguration.apiUrl + '/gestori';

  // getAnGestori
  public getAnGestori (): Observable<IAnGestore[]> {
    return this.http.get<IAnGestore[]>(`${this.apiUrl}/getAnGestori`);
  }

  // gest gestori monitorati
  public getAnGestoriMonitorati (): Observable<IGestoreMonitorato[]> {
    return this.http.get<IGestoreMonitorato[]>(`${this.apiUrl}/getAnGestoriMonitorati`);
  }
}
