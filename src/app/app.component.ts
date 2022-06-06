import { Observable } from 'rxjs';
import { SpinnerService } from './core/services/spinner.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'atmovies';
  toggleSideNav = false;
  isSpinnerShow: boolean = false;
  constructor(public spinner: SpinnerService ){}

  ngOnInit(){
    this.spinner.open.subscribe( val => this.isSpinnerShow = val );
  }
}
