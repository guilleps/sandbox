import { UserDTO } from '../../features/users/dto/user.dto';

export interface EventMap {
	userCreated: UserDTO;
	userSelected: { id: string };
	taskUpdated: { id: string; title: string };
}
