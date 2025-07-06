import { Injectable } from '@angular/core';
import { filter, map, Observable, Subject } from 'rxjs';

interface EventPayload {
    name: string;
    data?: any;
}

@Injectable({
    providedIn: 'root'
})
export class EventBusService {
    private eventSubject = new Subject<EventPayload>();

    emit(eventName: string, data?: any) {
        this.eventSubject.next({ name: eventName, data });
    }

    on<T = any>(eventName: string): Observable<T> {
        return this.eventSubject.asObservable().pipe(
            filter(event => event.name === eventName),
            map(event => event.data as T)
        );
    }
}