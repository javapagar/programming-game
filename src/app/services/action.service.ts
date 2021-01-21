import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { DropItem } from '../clases/drop-item';

@Injectable({
  providedIn: 'root'
})
export class ActionService {

  private action$ = new Subject <DropItem>();
  private action : DropItem;
  
  constructor() { 
    
  }

  setAction( action : DropItem) {
    this.action=action;
    this.action$.next(this.action);
  }

  getAction$() : Observable<DropItem>{
    return this.action$.asObservable();
  }
}
