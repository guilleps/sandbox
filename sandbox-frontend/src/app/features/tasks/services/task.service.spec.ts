import { ApolloTestingController, ApolloTestingModule } from 'apollo-angular/testing';
import { TestBed } from '@angular/core/testing';
import { TaskService } from '@app/features/tasks/services/task.service';
import { CreateTaskDTO } from '@app/features/tasks/dto/creat-task.dto';
import { GraphQLError } from 'graphql';

describe('TaskService', () => {
	let service: TaskService;
	let controller: ApolloTestingController;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [ApolloTestingModule],
			providers: [TaskService],
		});
		service = TestBed.inject(TaskService);
		controller = TestBed.inject(ApolloTestingController);
	});

	afterEach(() => controller.verify());

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	it('should create a task', done => {
		const taskInput: CreateTaskDTO = {
			title: 'Desplegar backend',
			description: 'Con digital ocean',
			assignedToUserId: '3232',
		};
		const expected = {
			id: '1',
			title: 'Desplegar backend',
			description: 'Con digital ocean',
			done: false,
			assignedToUserId: '3232',
		};

		service.createTask(taskInput).subscribe(task => {
			expect(task).toEqual(expected);
			done();
		});

		const op = controller.expectOne('CreateTask');
		op.flush({ data: { createTask: expected } });
	});

	it('should create a task wit validate data', done => {
		const taskInput: CreateTaskDTO = {
			title: 'Tarea inválida',
			description: '',
			assignedToUserId: 'errorId',
		};

		service.createTask(taskInput).subscribe({
			next: () => fail('Expected error'),
			error: err => {
				expect(err).toBeTruthy();
				done();
			},
		});

		const op = controller.expectOne('CreateTask');
		op.graphqlErrors([new GraphQLError('Invalid user')]);
	});

	it('should handle error when creating task fails', done => {
		const input: CreateTaskDTO = {
			title: 'Tarea inválida',
			description: '',
			assignedToUserId: 'errorId',
		};

		service.createTask(input).subscribe({
			next: () => fail('Expected error'),
			error: err => {
				expect(err).toBeTruthy();
				done();
			},
		});

		const op = controller.expectOne('CreateTask');
		op.graphqlErrors([new GraphQLError('Invalid user')]);
	});

	it('should get tasks by user', done => {
		const mockTasks = [
			{
				id: 'task001',
				title: 'Diseñar login-auth',
				description: 'Login con Apollo-ZORRO',
				done: false,
				assignedToUserId: 'u123',
			},
		];

		service.getTasksByUser('task-u123').subscribe(tasks => {
			expect(tasks.length).toBe(1);
			expect(tasks).toEqual(mockTasks);
			done();
		});

		const op = controller.expectOne('FindTasksByUserId');
		op.flush({ data: { findTasksByUserId: mockTasks } });
	});

	it('should return empty list if user has no tasks', done => {
		service.getTasksByUser('task-004u').subscribe(tasks => {
			expect(tasks).toEqual([]);
			done();
		});

		const op = controller.expectOne('FindTasksByUserId');
		op.flush({ data: { findTasksByUserId: [] } });
	});

	it('should mark a task as done', done => {
		const expected = {
			id: 'task-002',
			title: 'Actualizar README',
			done: true,
		};

		service.markTaskById('t1', true).subscribe(task => {
			expect(task).toEqual(expected);
			expect(task.done).toBeTrue();
			done();
		});

		const op = controller.expectOne('UpdateTaskStatusById');
		op.flush({ data: { updateTaskStatusById: expected } });
	});
});
