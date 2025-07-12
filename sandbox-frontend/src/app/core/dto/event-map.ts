import { UserDTO } from '../../features/users/dto/user.dto';

export interface EventMap {
	userCreated: UserDTO;
	taskUpdated: { id: string; title: string };
}
