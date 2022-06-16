import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie } from '../movies.interface';
import { MoviesService } from '../../../core/services/movies.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movies-component',
  templateUrl: './movies-component.component.html',
  styleUrls: ['./movies-component.component.css']
})
export class MoviesComponent implements OnInit {

  public movies$: Observable<Array<Movie>> | undefined | any;
  constructor(private _moviesService: MoviesService,     private router: Router) {
    
   }

  ngOnInit(): void {
    this.movies$ = this._moviesService.getMovies();
  }
  gotoAdd(){
    this.router.navigate(['/movies/add']);
  }
}
