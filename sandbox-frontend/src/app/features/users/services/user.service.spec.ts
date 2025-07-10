import { ApolloTestingModule, ApolloTestingController } from 'apollo-angular/testing';
import { TestBed } from '@angular/core/testing';
import { UserService } from '@app/features/users/services/user.service';
import { CreateUserDTO } from '@app/features/users/dto/create-user.dto';
import { GraphQLError } from 'graphql';

describe('UserService', () => {
	let service: UserService;
	let controller: ApolloTestingController;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [ApolloTestingModule],
			providers: [UserService],
		});
		service = TestBed.inject(UserService);
		controller = TestBed.inject(ApolloTestingController);
	});

	afterEach(() => controller.verify());

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	it('should create a user', done => {
		const userInput: CreateUserDTO = { name: 'Guillermo', email: 'guiso@gmail.com' }; // objeto de entrada
		const expected = { id: '1', name: 'Guillermo', email: 'guiso@gmail.com' }; // respuesta esperada

		// posee operacion asincronica
		service.createUser(userInput).subscribe(user => {
			// compara respuesta recibida(del servicio) con la esperada
			// no usa tobe porque no evaluamos referencias sino objetos y valores
			expect(user).toEqual(expected);
			done(); // indica que el test terminí, necesario para identificar el observable
		});

		const op = controller.expectOne('CreateUser'); // espera la peticion con operationName 'CreateUser'
		op.flush({ data: { createUser: expected } }); // sima la respuesta del servidor
	});

	it('should create a user wit validate data', done => {
		const userInput: CreateUserDTO = { name: 'Guillermo', email: 'guiso@gmail.com' };
		const expected = { id: '1', name: 'Guillermo', email: 'guiso@gmail.com' };

		expect(userInput.name).toMatch(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/);
		expect(userInput.email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
		expect(userInput.name).toBeTruthy();
		expect(userInput.email).toBeTruthy();

		service.createUser(userInput).subscribe(user => {
			expect(user).toEqual(expected);
			done();
		});

		const op = controller.expectOne('CreateUser');
		op.flush({ data: { createUser: expected } });
	});

	it('should handle error when creating user fails', done => {
		const userInput = { name: 'Ana', email: 'error@x.com' };

		service.createUser(userInput).subscribe({
			next: () => fail('Expected error'),
			error: err => {
				expect(err).toBeTruthy();
				done();
			},
		});

		const op = controller.expectOne('CreateUser');
		op.graphqlErrors([new GraphQLError('Email already exists')]);
	});

	it('should fetch all users', done => {
		const mockUsers = [{ id: '1', name: 'Ana', email: 'anernadex@gmail.com' }];
		service.getAllUsers().subscribe(users => {
			expect(users.length).toBe(1);
			expect(users).toEqual(mockUsers);
			done();
		});
		controller.expectOne('getAllUsers').flush({ data: { getAllUsers: mockUsers } });
	});

	it('should return empty array when no users exist', done => {
		service.getAllUsers().subscribe(users => {
			expect(users).toEqual([]);
			done();
		});

		controller.expectOne('getAllUsers').flush({ data: { getAllUsers: [] } });
	});

	it('should fetch users with tasks', done => {
		const mock = [{ user: { id: '1', name: 'Diego', email: 'deigo@gmail.com' }, tasks: [] }];
		service.getAllUsersAndTasks().subscribe(data => {
			expect(data.length).toBe(1);
			done();
		});
		controller.expectOne('getUsersWithTasks').flush({ data: { getUsersWithTasks: mock } });
	});
});
