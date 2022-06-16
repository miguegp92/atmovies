import { CompaniesService } from 'src/app/core/services/companies.service';
import { ActorsService } from './../../core/services/actors.service';
import { MatIconModule } from '@angular/material/icon';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoviesComponent } from './main/movies-component.component';
import { MoviesRoutingModule } from './movies-routing.module';
import { MoviesService } from '../../core/services/movies.service';
import { MatCardModule } from '@angular/material/card'
import { MoviesDetailComponent } from './detail/movies-detail.component';
import { MatDividerModule } from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import { DurationPipe } from '../../core/pipes/duration.pipe';
import { MoviesActionComponent } from './movies-action/movies-action/movies-action.component';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

@NgModule({
  declarations: [MoviesComponent, MoviesDetailComponent, DurationPipe, MoviesActionComponent],
  imports: [
    CommonModule,
    MoviesRoutingModule,
    MatCardModule,
    MatDividerModule,
    MatIconModule,
    MatButtonModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatChipsModule,
    MatAutocompleteModule 
  ], 
  providers: [MoviesService, ActorsService, CompaniesService]
})
export class MoviesModule { }
