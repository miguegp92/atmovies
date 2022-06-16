import { catchError } from 'rxjs/operators';
import { HttpService } from './http.service';
import { Injectable } from '@angular/core';
import { Observable, tap, of } from 'rxjs';
import { SpinnerService } from 'src/app/core/services/spinner.service';

@Injectable()
export class ActorsService {

  actors: any = [];

  constructor(private _http: HttpService, private _spinner: SpinnerService) {}

  init(){
    this.getActors().subscribe( result => {
      this.actors = result.reduce( (curr: any, el: any) => {
        curr[el.id] = el;
        return curr;
      }, {});
    });
  }

  public getActors(): Observable<any | null> {
    return this._http.getMethod('actors').pipe(tap(val => {      
    }), catchError(  (result: any) =>  {
      return of(null)
    }) );
  }

  public getActorById(id: number): Observable<any> {

    return this._http.getMethod(`actors/${id}`);

  }

  public getActorNameById(id: number): string {

    const actor = this.actors[id];
    return actor ? `${actor.first_name} ${actor.last_name || ''}` : '';
  }
}
