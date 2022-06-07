import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ActorsService } from 'src/app/core/services/actors.service';
import { CompaniesService } from 'src/app/core/services/companies.service';
import { MoviesService } from 'src/app/core/services/movies.service';
import { Movie } from '../../movies.interface';

@Component({
  selector: 'app-movies-action',
  templateUrl: './movies-action.component.html',
  styleUrls: ['./movies-action.component.css']
})
export class MoviesActionComponent implements OnInit {
  public movie$: Observable<Movie> | undefined;
  idMovie: number = 0;
  mode: string = 'add';
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _moviesService: MoviesService,
    private _actorsService: ActorsService,
    private _companiesService: CompaniesService
  ) {}

  ngOnInit(): void {
    debugger;
    this._actorsService.init();
    this._companiesService.init();
    this.switchMode();
  }

  switchMode(){
    console.log( this.route.snapshot.paramMap )
    this.idMovie = Number(this.route.snapshot.paramMap.get('id'));
    this.mode = this.idMovie === 0 || this.idMovie !== undefined ? 'edit' : 'add' ;
    // this.mode = this.route.snapshot.paramMap.get('add')
  }
}
