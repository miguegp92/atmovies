import { Observable } from 'rxjs';
import { SpinnerService } from './core/services/spinner.service';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgTemplateOutlet } from '@angular/common';
import { NotificationService } from './core/services/notification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  // @ViewChild('snackBar', { static: false }) snackBar!: TemplateRef<any>;

  title = 'atmovies';
  toggleSideNav = false;
  isSpinnerShow: boolean = false;
  durationSnackBar = 5;

  constructor(public spinner: SpinnerService, private _notify: NotificationService, private translate: TranslateService, private _snackBar: MatSnackBar ){
    translate.setDefaultLang('es');
    translate.use('es');
  }

  ngOnInit(){
    this.spinner.open.subscribe( val => this.isSpinnerShow = val );
    this._notify.notification$.subscribe( (msg: string) => this.openSnackBar(msg) );
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, undefined, {
      duration: this.durationSnackBar * 1000,
    });
  }
}
