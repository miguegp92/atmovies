import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie } from '../movies.interface';
import { MoviesService } from '../../../core/services/movies.service';

@Component({
  selector: 'app-movies-component',
  templateUrl: './movies-component.component.html',
  styleUrls: ['./movies-component.component.css']
})
export class MoviesComponent implements OnInit {

  public movies$: Observable<Array<Movie>> | undefined | any;
  constructor(private _moviesService: MoviesService) {
    
   }

  ngOnInit(): void {
    this.movies$ = this._moviesService.getMovies();
  }

}
