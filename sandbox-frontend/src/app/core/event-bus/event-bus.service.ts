import { Injectable } from '@angular/core';
import { filter, map, Observable, Subject } from 'rxjs';
import { EventMap } from '../dto/event-map';

/**
 * EventBusService permite emitir y suscribirse a eventos dentro de la app
 *
 * @template Events - Map de eventos que posee = ({key: clave de los nombres, data: data asociada al evento})
 * Si no se proporciona un tipo específico, se usa por defecto `EventMap`.
 */
@Injectable({
	providedIn: 'root',
})
export class EventBusService {
	private eventSubject = new Subject<{
		name: keyof EventMap;
		data: EventMap[keyof EventMap];
	}>();

	/**
	 * Emite eventos con su respectivo identificador con su respectiva data
	 * @param  {K} eventName - key(identificador) del evento a emitir
	 * @param  {Events[K]} data - Datos del evento emitido
	 *
	 * @example eventBus.emit('userCreated', { id: '4231', name: 'Fernando', email: 'fernan@gmail.com' })
	 */
	emit<K extends keyof EventMap>(eventName: K, data: EventMap[K]): void {
		this.eventSubject.next({ name: eventName, data });
	}

	/**
	 * Escucha/recepciona un evento según su key, retornando los datos propios del evento
	 * @param {K} eventName - key(identificador) del evento a observar(observable)/reaccionar
	 * @returns {observable<Events[K]>} Observable emisor de los datos al lanzar un evento
	 *
	 * @example eventBus.on('userCreated').subscribe(usr => console.log('[USER EVENT]', usr))
	 */
	on<K extends keyof EventMap>(eventName: K): Observable<EventMap[K]> {
		return this.eventSubject.asObservable().pipe(
			filter(event => event.name === eventName),
			map(event => event.data as EventMap[K]),
		);
	}
}
