import { catchError } from 'rxjs/operators';
import { HttpService } from './http.service';
import { Injectable } from '@angular/core';
import { Observable, tap, of } from 'rxjs';
import { Movie } from '../../pages/movies-component/movies.interface';
import { SpinnerService } from 'src/app/core/services/spinner.service';

@Injectable()
export class MoviesService {
  movies: any = [];

  constructor(private _http: HttpService, private _spinner: SpinnerService) {}

  public getMovies(): Observable<Movie | null> {
    this._spinner.toggle(true);
    return this._http.getMethod('movies').pipe(
      tap((val) => {
        this.movies = val.reduce((curr: any, el: any) => {
          curr[el.id] = el;
          return curr;
        }, {});
        this._spinner.toggle(false);
      }),
      catchError((result: any) => {
        this._spinner.toggle(false);
        return of(null);
      })
    );
  }

  public getMovieById(id: number | null): Observable<Movie> {
    this._spinner.toggle(true);
    return this._http.getMethod(`movies/${id}`).pipe(
      tap((val) => {
        this._spinner.toggle(false);
      })
    );
  }

  public deleteMovie(id: number): Observable<any> {
    this._spinner.toggle(true);
    return this._http.deleteMethod(`movies/${id}`).pipe(
      tap((val) => {
        this._spinner.toggle(false);
      })
    );
  }

  public updateMovie(id: number, movie: Movie): Observable<any> {
    this._spinner.toggle(true);
    return this._http.putMethod(`movies/${id}`, movie).pipe(
      tap((val) => {
        this._spinner.toggle(false);
        console.log('Guardado correctamente')
        // Notification Service
      })
    );
  }

  public addMovie(movie: Movie): Observable<any> {
    this._spinner.toggle(true);
    return this._http.postMethod(`movies`, movie).pipe(
      tap((val) => {
        this._spinner.toggle(false);
        console.log('Guardado correctamente')
        // Notification Service
      })
    );
  }
}
