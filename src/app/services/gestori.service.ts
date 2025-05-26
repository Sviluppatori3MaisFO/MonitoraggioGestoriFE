import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {IAnGestore, IGestoreImportazioneMovimentiChart, IGestoreMonitorato} from './models/gestori.model';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GestoriService {

  constructor(private http: HttpClient) { }

  private apiUrl = environment.apiConfiguration.apiUrl + '/gestori';


  // gest gestori monitorati
  public getAnGestoriMonitorati (): Observable<IGestoreMonitorato[]> {
    return this.http.get<IGestoreMonitorato[]>(`${this.apiUrl}/getAnGestoriMonitorati`);
  }

  // get gestore monitorato by id gestore
  public getGestoreMonitoratoByIdGestore (idGestore: number): Observable<IGestoreMonitorato> {
    return this.http.get<IGestoreMonitorato>(`${this.apiUrl}/getGestoreMonitoratoByIdGestore/${idGestore}`);
  }

  public getQuantitaGestoriChart (idGestore: number): Observable<IGestoreImportazioneMovimentiChart[]> {
    return this.http.get<IGestoreImportazioneMovimentiChart[]>(`${this.apiUrl}/getQuantitaGestoriChart/${idGestore}`);
  }

  public editGestoreMonitorato (model: IGestoreMonitorato): Observable<boolean> {
    return this.http.post<boolean>(`${this.apiUrl}/editGestoreMonitorato`, model);
  }
}
