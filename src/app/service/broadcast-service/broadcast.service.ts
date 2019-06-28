import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

/*
Use of subject and observable allows
to communicate between components of the same level as 
for example between search-bar.component and profile.component
*/
@Injectable({
  providedIn: 'root'
})
export class BroadcastService {

  private subject = new Subject<any>();

  sendData(data: any) {
      this.subject.next(data);
  }

  clearData() {
      this.subject.next();
  }

  getData(): Observable<any> {      
      return this.subject.asObservable();
  }
}
