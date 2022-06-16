import { catchError } from 'rxjs/operators';
import { HttpService } from './../../core/services/http.service';
import { Injectable } from '@angular/core';
import { Observable, tap, of } from 'rxjs';
import { Movie } from './movies.interface';
import { SpinnerService } from 'src/app/core/services/spinner.service';

@Injectable()
export class MoviesService {

  constructor(private _http: HttpService, private _spinner: SpinnerService) { 
   
  }

  public getMovies(): Observable<Movie | null> {
    this._spinner.toggle(true)
    return this._http.getMethod('movies').pipe(tap(val => {
     this._spinner.toggle(false)
    }), catchError(  (result: any) =>  {
      this._spinner.toggle(false)
      return of(null)
    }) );
  }
}
