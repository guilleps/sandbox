import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { CreateUserDTO } from '../dto/create-user.dto';
import { UserDTO } from '../dto/user.dto';
import { UserList } from '../dto/user-list.dto';
import { Apollo, gql } from 'apollo-angular';

/**
 * Servicio encargado de la gestión de usuarios mediante Apollo&graphql
 */
@Injectable()
export class UserService {
	constructor(private apollo: Apollo) {}

	/**
	 * Crea un usuario nuevo
	 *
	 * @param {CreateUserDTO} user - Objeto que contiene los datos del nuevo usuario (nombre y correo electrónico)
	 * @returns {Observable<UserDTO>} Observable que emite el usuario creado al completarse la operación
	 *
	 * @example userService.createUser({ name: 'Sebas', email: 'sebas01@gmail.com' })
	 * 				.subscribe(user => console.log(user.id));
	 */
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

	/**
	 * Obtiene la lista de todos los usuarios creados
	 *
	 * @returns {Observable<UserDTO[]>} Observable que emite un arreglo de usuarios existentes.
	 *
	 * @example userService.getAllUsers().subscribe(users => console.log(users.length));
	 */
	getAllUsers(): Observable<UserDTO[]> {
		const GET_ALL_USERS = gql`
			query getAllUsers {
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

	/**
	 * Obtiene todos los usuarios junto con sus respectivas tareas asignadas
	 *
	 * @returns {Observable<UserList[]>} Observable que emite un arreglo donde cada item posee un usuario y su lista de tareas.
	 *
	 * @example userService.getAllUsersAndTasks()
	 *   			.subscribe(data => console.log(data[0].user.name, data[0].tasks.length));
	 */
	getAllUsersAndTasks(): Observable<UserList[]> {
		const USERS_WITH_TASKS = gql`
			query getUsersWithTasks {
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
