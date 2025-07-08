import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserFormComponent } from './user-form.component';
import { FormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { UserDTO } from '../../dto/user.dto';
import { UserService } from '../../services/user.service';
import { EventBusService } from '../../../../core/event-bus/event-bus.service';

describe('UserFormComponent', () => {
	let component: UserFormComponent;
	let fixture: ComponentFixture<UserFormComponent>;

	const mockUser: UserDTO = {
		id: '1',
		name: 'Guillermo',
		email: 'guillermo@test.com',
	};

	const mockUserService = {
		createUser: jasmine.createSpy('createUser').and.returnValue(of(mockUser)),
	};

	const mockEventBusService = {
		emit: jasmine.createSpy('emit'),
	};

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [UserFormComponent],
			imports: [
				FormsModule,
				NzFormModule,
				NzInputModule,
				NzButtonModule,
				NzCardModule,
				BrowserAnimationsModule,
			],
			providers: [
				{ provide: UserService, useValue: mockUserService },
				{ provide: EventBusService, useValue: mockEventBusService },
			],
		}).compileComponents();

		fixture = TestBed.createComponent(UserFormComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should initialize with empty values', () => {
		expect(component.form).toEqual({ name: '', email: '' });
	});

	it('should use createUser and emit event when exec saveUser()', () => {
		const input = { name: 'memo', email: 'memo@gmail.com' };
		component.form = input;
		component.saveUser();

		expect(mockUserService.createUser).toHaveBeenCalledWith(input);
		expect(mockEventBusService.emit).toHaveBeenCalledWith('userCreated', mockUser);
		expect(component.created).toEqual(mockUser);
		expect(component.form).toEqual({ name: '', email: '' });
	});

	it('should clear inputs after creating a user', () => {
		component.form = { name: 'memo', email: 'memo@gmail.com' };
		fixture.detectChanges();

		component.saveUser();
		fixture.detectChanges();

		const compiled = fixture.nativeElement as HTMLElement;
		const nameInput = compiled.querySelector('input#name') as HTMLInputElement;
		const emailInput = compiled.querySelector('input#email') as HTMLInputElement;

		expect(nameInput.value).toBe('');
		expect(emailInput.value).toBe('');
	});
});
