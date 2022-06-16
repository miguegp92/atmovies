
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
    open = new BehaviorSubject(false);

    show(): void {
        this.open.next(true);
    }

    hide(): void {
        this.open.next(false);
    }

    toggle(param: boolean): void {
        console.log(param)
        this.open.next(param);
    }
}