import { TestBed } from '@angular/core/testing';

import { EventBusService } from '@app/core/event-bus/event-bus.service';

describe('EventBusService', () => {
	let service: EventBusService;

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [EventBusService],
		});
		service = TestBed.inject(EventBusService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	it('should emit/receive a userCreated event', done => {
		const mockUse = {
			id: '1',
			name: 'William',
			email: 'william@gmail.com',
		};

		service.on('userCreated').subscribe(data => {
			expect(data).toEqual(mockUse);
			done();
		});

		service.emit('userCreated', mockUse);
	});

	it('should NOT emit an event if its no event type', done => {
		let wasCalled = false;

		service.on('taskUpdated').subscribe(() => {
			wasCalled = true;
		});

		service.emit('userCreated', { id: '2', name: 'Deigo', email: 'deigo@gmail.com' });

		setTimeout(() => {
			expect(wasCalled).toBeFalse();
			done();
		}, 100);
	});
});
