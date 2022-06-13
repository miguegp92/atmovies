
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class NotificationService {
    notification$ = new BehaviorSubject('');

    constructor(private _translateService: TranslateService){}

    showNotificationSuccess(){
      this._translateMethod('notification.success');
    }
    showNotificationError() {
      this._translateMethod('notification.error');
    }

    private _translateMethod(keyString: string){
      this._translateService.get(keyString).subscribe((resTranslated: string) => {
        this.notification$.next( resTranslated );
      });
    }

}