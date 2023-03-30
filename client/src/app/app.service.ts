import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  notificationSubject = new Subject<{ message: string }>();

  constructor() {}

  get notification$(): Observable<any> {
    return this.notificationSubject.asObservable();
  }

  notify(message: string): void {
    this.notificationSubject.next({ message });
  }
}
