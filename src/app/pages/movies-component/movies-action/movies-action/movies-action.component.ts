import { catchError } from 'rxjs/operators';
import { SpinnerService } from 'src/app/core/services/spinner.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, BehaviorSubject, Subject, zip, of } from 'rxjs';
import { ActorsService } from 'src/app/core/services/actors.service';
import { CompaniesService } from 'src/app/core/services/companies.service';
import { MoviesService } from 'src/app/core/services/movies.service';
import { Movie } from '../../movies.interface';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-movies-action',
  templateUrl: './movies-action.component.html',
  styleUrls: ['./movies-action.component.css']
})
export class MoviesActionComponent implements OnInit {
  public movie: Movie | undefined;
  idMovie: number = 0;
  mode: string = 'add';
  companiesList: Array<any> = [];
  actorList: Array<any> = [];
  currentYear: number = new Date().getFullYear();
  movieForm = this.formBuilder.group({
    title: '',
    poster: '',
    year: '',
    duration: '',
    imdbRating: '',
    genre: [],
    actors: [],
    id: this.idMovie,
  });


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _moviesService: MoviesService,
    private _actorsService: ActorsService,
    private _spinner: SpinnerService,
    private _companiesService: CompaniesService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.switchMode();
    this.loadCompaniesList();

    this._actorsService.init();
    this._companiesService.init();
    
  }

  loadAllData(){
    this._spinner.show();
    const dataMovie = this.loadMovieData();
    const dataCompanies = this.loadCompaniesList();
    const dataActors = this.loadActorData();

    zip([dataMovie, dataCompanies, dataActors]).subscribe( (result: Array<any>) => {
      this._spinner.hide();
      this.movie = result[0];
      if(this.movie) this.movieForm.setValue((this.movie))
      
      this.mode = this.movie ? 'edit' : 'add';
      this.companiesList = result[1].map( (company: any) => ({id: company.id, name: company.name}) );
      this.actorList = result[2].map( (actor: any) => ({id: actor.id, name: `${actor.first_name} ${(actor.last_name || '') }` } ) );
    }, (error) => {
      this._spinner.hide();
      console.log( error )
    }); 
  }
  loadCompaniesList(): Observable<any>{

    return this._companiesService.getCompanies().pipe(catchError( error => of(null) ));
  }

  loadMovieData(): Observable<Movie | null>{

    return this._moviesService.getMovieById(this.idMovie).pipe(catchError( error => of(null) ));
  }

  loadActorData(): Observable<any>{

    return this._actorsService.getActors().pipe(catchError( error => of(null) ));
  }

  switchMode(){
    this.idMovie = Number(this.route.snapshot.paramMap.get('id'));
    this.mode = this.idMovie === 0 || this.idMovie !== undefined ? 'edit' : 'add' ;
    this.loadAllData();
  }

  saveChanges(){
    this.mode === 'add' ? this.addPelicula() : this.updatePelicula();
  }

  addPelicula() {
    this._moviesService.addMovie(this.movieForm.value).subscribe( (result) => console.log('OK'), (error)=> console.error('KO', error) )
  }

  updatePelicula() {
    this._moviesService.updateMovie(this.idMovie, this.movieForm.value).subscribe( (result) => console.log('OK'), (error)=> console.error('KO', error) )
  }
}
