import { SpinnerService } from './spinner.service';
import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient} from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpService {



  constructor(private http: HttpClient) { }

  postMethod(path: string, params?: any): Observable<any> {
    return this.http.post(`${environment.urlBase}/${path}`, params).pipe(tap(val => {
      console.log(val)

    }));
  }

  getMethod(path: string): Observable<any> {
    return this.http.get(`${environment.urlBase}/${path}`).pipe(tap(val => {
      console.log(val);
    }));
  }

  putMethod(path: string, params?: any): Observable<any> {

    return this.http.put(`${environment.urlBase}/${path}`, params).pipe(tap(val => {
      console.log(val)
    }));
  }

  deleteMethod(path: string): Observable<any> {
    return this.http.delete(`${environment.urlBase}/${path}`).pipe(tap(val => {
      console.log(val)
    }));
  }




}
