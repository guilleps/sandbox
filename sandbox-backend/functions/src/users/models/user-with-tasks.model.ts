import { Field, ObjectType } from 'type-graphql';
import { User } from './User';
import { Task } from '../../tasks/models/Task';

@ObjectType()
export class UserWithTasks {
	@Field(() => User)
	user!: User;

	@Field(() => [Task])
	tasks!: Task[];
}
