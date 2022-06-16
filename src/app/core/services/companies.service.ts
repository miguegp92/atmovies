import { catchError } from 'rxjs/operators';
import { HttpService } from './http.service';
import { Injectable } from '@angular/core';
import { Observable, tap, of } from 'rxjs';
import { SpinnerService } from 'src/app/core/services/spinner.service';

@Injectable()
export class CompaniesService {

  companies: any = [];
  relMovieByCompany: any = [];
  constructor(private _http: HttpService, private _spinner: SpinnerService) { 
   
  }
  init(){
    
    this.getCompanies().subscribe( result => {
      this.companies = result.reduce( (curr: any, el: any) => {
        curr[el.id] = el.movies;
        return curr;
      }, {});

      this.relMovieByCompany = result.reduce( (curr: any, el: any) => {
        el.movies.forEach( (movieId: number) => curr[movieId] = el.name);
        return curr;
      }, {});
    });
  }
  public getCompanies(): Observable<any | null> {
    return this._http.getMethod('companies').pipe(tap(val => {
     
    }), catchError(  (result: any) =>  {
      return of(null)
    }) );
  }

  public getCompanyById(id: number): Observable<any> {
    return  this._http.getMethod(`companies/${id}`).pipe(
      catchError(  (result: any) =>  {
     return of(null)
    }));
  }

  public updateCompany(company: any): Observable<any> {
    this._spinner.toggle(true);
    return this._http.putMethod(`companies/${company.id}`, company).pipe(
      tap((val) => {
        this._spinner.toggle(false);
        console.log('Guardado correctamente')
        // Notification Service
      })
    );
  }

  // http://localhost:3000/companies?movies_like=5
  public getCompanyByIdMovie(idMovie: number): Observable<any> {
    return  this._http.getMethod(`companies?movies_like=${idMovie}`).pipe(
      catchError(  (result: any) =>  {
     return of(null)
    }));
  }

  public getCompanyNameById(id: number): string {

    const company = this.companies[id];
    return company ? `${company.name}` : '';
  }
}
