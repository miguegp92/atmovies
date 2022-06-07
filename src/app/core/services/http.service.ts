import { SpinnerService } from './spinner.service';
import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private _options = {
    headers: new HttpHeaders(
      {
        'Content-Type': 'application/json',
      })
  };

  constructor(private http: HttpClient, private _spinner: SpinnerService) { }

  postMethod(path: string, params?: any): Observable<any> {
    return this.http.post(`${environment.urlBase}/${path}`, params, this._options).pipe(tap(val => {
      console.log(val)
    }) );
  }

  getMethod(path: string): Observable<any> {
    return this.http.get(`${environment.urlBase}/${path}`, this._options).pipe(tap(val => {
      console.log(val);
    }) );
  }

  putMethod(path: string, params?: any): Observable<any> {

    return this.http.put(`${environment.urlBase}/${path}`, params, this._options).pipe(tap(val => {
      console.log(val)
    }) );
  }

  deleteMethod(path: string): Observable<any> {
    return this.http.delete(`${environment.urlBase}/${path}`, this._options).pipe(tap(val => {
      console.log(val)
    }));
  }




}
