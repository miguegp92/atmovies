import { catchError, tap } from 'rxjs/operators';
import { SpinnerService } from 'src/app/core/services/spinner.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, BehaviorSubject, Subject, zip, of } from 'rxjs';
import { ActorsService } from 'src/app/core/services/actors.service';
import { CompaniesService } from 'src/app/core/services/companies.service';
import { MoviesService } from 'src/app/core/services/movies.service';
import { Movie } from '../../movies.interface';
import { FormBuilder, Validators } from '@angular/forms';
import { NotificationService } from 'src/app/core/services/notification.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { map, startWith } from 'rxjs/operators';
import { MatChipInputEvent } from '@angular/material/chips';

@Component({
  selector: 'app-movies-action',
  templateUrl: './movies-action.component.html',
  styleUrls: ['./movies-action.component.css'],
})
export class MoviesActionComponent implements OnInit {
  public movie!: Movie;
  idMovie: number = 0;
  mode: string = 'add';
  companiesList: Array<any> = [];
  actorList: Array<any> = [];
  currentYear: number = new Date().getFullYear();
  movieForm = this.formBuilder.group({
    title: ['', Validators.required],
    poster: ['', Validators.required],
    year: this.currentYear,
    duration: [0, Validators.required],
    imdbRating: [0, Validators.required],
    genre: [],
    actors: [],
    id: this.idMovie,
  });

  companyRelationship: number = 0;
  companyOld: number = 0;

  filteredActors: Observable<number[]> | undefined;
  loadingContent: boolean = false;
  keywords: Set<string> = new Set([]);


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _moviesService: MoviesService,
    private _actorsService: ActorsService,
    private _spinner: SpinnerService,
    private _companiesService: CompaniesService,
    private _notify: NotificationService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this._spinner.open.subscribe((val: boolean) => (this.loadingContent = val));
    this.switchMode();
    this.loadCompaniesList();

    this._actorsService.init();
    this._companiesService.init();
    this.filteredActors = this.movieForm.get('actors')?.valueChanges.pipe(
      startWith(null),
      map((actor: number | null) =>
        actor ? this._filter(actor) : this.movie.actors.slice()
      )
    );
  }

  loadAllData() {
    this._spinner.show();
    const dataMovie = this.loadMovieData();
    const dataCompanies = this.loadCompaniesList();
    const dataActors = this.loadActorData();

    zip([dataMovie, dataCompanies, dataActors]).subscribe(
      (result: Array<any>) => {
        this.movie = result[0];
        if (this.movie) {
          this.movieForm.setValue(this.movie);
        } else {
          this.movie = this.movieForm.value;
          this.movie.actors = [];
          this.movie.genre = [];
        }

        this.mode = this.movie.id && this.movie.id > 0 ? 'edit' : 'add';
        this.companiesList = result[1];
        this.actorList = result[2].map((actor: any) => ({
          id: actor.id,
          name: `${actor.first_name} ${actor.last_name || ''}`,
        }));
        this.keywords = new Set(this.movie.genre);
        this._spinner.hide();
      },
      (error) => {
        this._spinner.hide();
        console.log(error);
      }
    );
  }

  loadCompaniesList(): Observable<any> {
    return this._companiesService
      .getCompanies()
      .pipe(tap( (companies: Array<any>) => {
        if(this.idMovie){
          this.companyRelationship = companies.find( (c: any) => c.movies.some( (m: number) => m === this.idMovie) ).id;
          this.companyOld = Number(this.companyRelationship);
        }
        
      }), catchError((error) => of(null)));
  }

  loadMovieData(): Observable<Movie | null> {
    return this._moviesService
      .getMovieById(this.idMovie)
      .pipe(catchError((error) => of(null)));
  }

  loadActorData(): Observable<any> {
    return this._actorsService
      .getActors()
      .pipe(catchError((error) => of(null)));
  }

  switchMode() {
    this.idMovie = Number(this.route.snapshot.paramMap.get('id'));
    this.mode =
      this.idMovie === 0 || this.idMovie !== undefined ? 'edit' : 'add';
    this.loadAllData();
  }

  saveChanges() {
    this.updateMovieActorsForm();
    this.updateMovieKeywords();
    this.mode === 'add' ? this.addPelicula() : this.updatePelicula();
  }

  addPelicula() {
    this._moviesService.addMovie(this.movieForm.value).subscribe(
      (result) => {
        this.updateCompanyItem(result.id)
        this._notify.showNotificationSuccess();
        this.router.navigate(['/movies', result.id]);
      },
      (error) => {
        this._notify.showNotificationError();
        this.loadAllData();
      }
    );
  }

  updatePelicula() {
    this._moviesService
      .updateMovie(this.idMovie, this.movieForm.value)
      .subscribe(
        (result) => {
        this.updateCompanyItem(result.id)
          this._notify.showNotificationSuccess(); 
          this.router.navigate(['/movies', result.id]);
        },
        (error) => {
          this._notify.showNotificationError();
          this.loadAllData();
        }
      );
  }

  // Update Companies
  updateCompanyItem(idMovie: number) {
    if(this.companyOld !== this.companyRelationship){
      let oldUpd1 = of(undefined)
      if(this.mode === 'edit'){
        const oldCompany = this.companiesList.find( (c: any) => c.id === this.companyOld );
        oldCompany.movies.splice( oldCompany.movies.indexOf(idMovie), 1  );
        oldUpd1 = this._companiesService.updateCompany(oldCompany);
      }
      

      const newCompany = this.companiesList.find( (c: any) => c.id === this.companyRelationship );
      newCompany.movies.push( idMovie );

      
      const newUpd = this._companiesService.updateCompany(newCompany);
      zip([oldUpd1 , newUpd]).subscribe( console.log), catchError( (error) => {
        this._notify.showCustomNotification('error.companies.updated'); 
        return of(null);
      });
    }
    
    console.log(this.companyRelationship)
    console.log(this.companyOld)
  }
  // Desplegables y chips para la feature de Actores
  updateMovieActorsForm() {
    this.movieForm.get('actors')?.setValue(this.movie.actors);
  }



  getActorName(id: number): string {
    return this._actorsService.getActorNameById(id);
  }

  pushActorToMovie(event: any) {
    const index = this.movie.actors.indexOf(event.value);
    if (index >= 0) {
      this._notify.showCustomNotification('notification.actor.filled');
    } else {
      this.movie.actors.push(event.value);
    }
  }

  drop(event: any) {
    moveItemInArray(this.movie.actors, event.previousIndex, event.currentIndex);
  }

  remove(actorIndex: number): void {
    const index = this.movie.actors.indexOf(actorIndex);

    if (index >= 0) {
      this.movie.actors.splice(index, 1);
    }
  }

  private _filter(value: number): number[] {
    return this.movie.actors.filter((actor) => actor !== value);
  }

  // Funciones para los generos
  addKeywordFromInput(event: MatChipInputEvent) {
    if (event.value) {
      this.keywords.add(event.value);
      event.chipInput!.clear();
    }
  }

  updateMovieKeywords() {
    const generos = [];
    for (let [key, value] of this.keywords.entries()) generos.push(value)

    this.movieForm.get('genre')?.setValue( generos );
  }
  removeKeyword(keyword: string) {
    this.keywords.delete(keyword);
  }
}
