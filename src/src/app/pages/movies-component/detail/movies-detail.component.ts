import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ActorsService } from 'src/app/core/services/actors.service';
import { CompaniesService } from 'src/app/core/services/companies.service';
import { Movie } from '../movies.interface';
import { MoviesService } from '../../../core/services/movies.service';

@Component({
  selector: 'app-movies-detail',
  templateUrl: './movies-detail.component.html',
  styleUrls: ['./movies-detail.component.css'],
})
export class MoviesDetailComponent implements OnInit {
  public movie$: Observable<Movie> | undefined;
  idMovie: number = 0;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _moviesService: MoviesService,
    private _actorsService: ActorsService,
    private _companiesService: CompaniesService
  ) {}

  ngOnInit(): void {
    this._actorsService.init();
    this._companiesService.init();
    this.idMovie = Number(this.route.snapshot.paramMap.get('id'));
    this.movie$ = this._moviesService.getMovieById(this.idMovie);
  }

  getActorName(id: number): string {
    return this._actorsService.getActorNameById(id);
  }

  getCompanyByIdMovie(id: number){
    return this._companiesService.relMovieByCompany[id];
  }

  gotoEdit(id: number){
    this.router.navigate([id, '/edit']);
  }

  deleteMovie() {
    if (
      confirm('Va a eliminar esta película, ¿está seguro que quiere continuar?')
    ) {
      this._moviesService.deleteMovie(this.idMovie).subscribe((result) => {
        this.router.navigate(['/movies']);
      });
    }
  }
}
