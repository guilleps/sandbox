import { TaskDTO } from '../../tasks/dto/task.dto';
import { UserDTO } from './user.dto';

export interface UserList {
	user: UserDTO;
	tasks: TaskDTO[];
}
