import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ISidebar} from './models/utils.model';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(private http: HttpClient) { }

  private apiUrl = environment.apiConfiguration.apiUrl + '/api/utils';

  public getSidebar (): Observable<ISidebar[]> {
    return this.http.get<ISidebar[]>(`${this.apiUrl}/getSidebar`);
  }
}
