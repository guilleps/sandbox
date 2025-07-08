import { Injectable } from '@angular/core';
import { filter, map, Observable, Subject } from 'rxjs';
import { EventMap } from './objects/event-map';

@Injectable({
	providedIn: 'root',
})
export class EventBusService<Events extends { [K in keyof Events]: unknown } = EventMap> {
	private eventSubject = new Subject<{ name: keyof Events; data: Events[keyof Events] }>();

	emit<K extends keyof Events>(eventName: K, data: Events[K]): void {
		this.eventSubject.next({ name: eventName, data });
	}

	on<K extends keyof Events>(eventName: K): Observable<Events[K]> {
		return this.eventSubject.asObservable().pipe(
			filter(event => event.name === eventName),
			map(event => event.data as Events[K]),
		);
	}
}
