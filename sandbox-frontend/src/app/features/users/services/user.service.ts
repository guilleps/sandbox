import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { CreateUserDTO } from '../dto/create-user.dto';
import { UserDTO } from '../dto/user.dto';
import { UserList } from '../dto/user-list.dto';
import { Apollo, gql } from 'apollo-angular';

@Injectable()
export class UserService {
	constructor(private apollo: Apollo) {}

	createUser(user: CreateUserDTO): Observable<UserDTO> {
		const CREATE_USER = gql`
			mutation CreateUser($name: String!, $email: String!) {
				createUser(data: { name: $name, email: $email }) {
					id
					name
					email
				}
			}
		`;

		return this.apollo
			.mutate<{ createUser: UserDTO }>({
				mutation: CREATE_USER,
				variables: { name: user.name, email: user.email },
			})
			.pipe(map(res => res.data!.createUser));
	}

	getAllUsers(): Observable<UserDTO[]> {
		const GET_ALL_USERS = gql`
			query {
				getAllUsers {
					id
					name
					email
				}
			}
		`;

		return this.apollo
			.watchQuery<{ getAllUsers: UserDTO[] }>({
				query: GET_ALL_USERS,
				fetchPolicy: 'network-only',
			})
			.valueChanges.pipe(map(result => result.data.getAllUsers));
	}

	getAllUsersAndTasks(): Observable<UserList[]> {
		const USERS_WITH_TASKS = gql`
			query {
				getUsersWithTasks {
					user {
						id
						name
						email
					}
					tasks {
						id
						title
						done
					}
				}
			}
		`;

		return this.apollo
			.watchQuery<{ getUsersWithTasks: UserList[] }>({
				query: USERS_WITH_TASKS,
				fetchPolicy: 'network-only',
			})
			.valueChanges.pipe(map(result => result.data.getUsersWithTasks));
	}
}
