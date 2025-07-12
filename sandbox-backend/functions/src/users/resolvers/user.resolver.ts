import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { User } from '../models/User';
import { UserRepository } from '../repositories/user.repository';
import { CreateUser } from '../dto/create-user.dto';
import { TaskRepository } from '../../tasks/repositories/task.repository';
import { DeleteUser } from '../dto/delete-user.dto';
import { UserByEmail } from '../dto/user-by-email.dto';
import { UpdateUser } from '../dto/update-user.dto';
import { UserWithTasks } from '../models/user-with-tasks.model';
import { UserById } from '../dto/user-by-id.dto';

/**
 * Actua como controller, expone las operaciones(query & mutation) del sistema
 * Usa UserRepository para acceder a la capa de datos con Firestore(FireORM)
 */
@Resolver(() => User)
export class UserResolver {
	private readonly userRepo = new UserRepository();

	/**
	 * Consulta para buscar un usuario por su correo electrónico
	 *
	 * @param {UserByEmail} data - DTO con el campo email
	 * @returns {Promise<User | null>} Usuario encontrado o null
	 *
	 * @example
	 * query {
	 *   userByEmail(data: { email: "jose@example.com" }) {
	 *     id
	 *     name
	 *     email
	 *   }
	 * }
	 */
	@Query(() => User, { nullable: true })
	findUserById(@Arg('data') data: UserById): Promise<User | null> {
		return this.userRepo.findUserById(data.id);
	}

	/**
	 * Consulta para buscar un usuario por su correo electrónico
	 *
	 * @param {UserByEmail} data - DTO con el campo email
	 * @returns {Promise<User | null>} Usuario encontrado o null
	 *
	 * @example
	 * query {
	 *   userByEmail(data: { email: "jose@example.com" }) {
	 *     id
	 *     name
	 *     email
	 *   }
	 * }
	 */
	@Query(() => User, { nullable: true })
	findUserByEmail(@Arg('data') data: UserByEmail): Promise<User | null> {
		return this.userRepo.findUserByEmail(data.email);
	}

	/**
	 * Consulta para obtener todos los usuarios registrados
	 *
	 * @returns {Promise<User[]>} Lista de usuarios
	 *
	 * @example
	 * query {
	 *   getAllUsers {
	 *     id
	 *     name
	 *     email
	 *   }
	 * }
	 */
	@Query(() => [User])
	getAllUsers(): Promise<User[]> {
		return this.userRepo.getAllUsers();
	}

	/**
	 * Consulta que devuelve una lista de usuarios con sus tareas asociadas
	 * Útil para vistas de dashboard o seguimiento de tareas por usuario
	 *
	 * @returns {Promise<UserWithTasks[]>} Lista de usuarios junto a sus tareas
	 *
	 * @example
	 * query {
	 *   getUsersWithTasks {
	 *     user {
	 *       name
	 *       email
	 *     }
	 *     tasks {
	 *       title
	 *       done
	 *     }
	 *   }
	 * }
	 */
	@Query(() => [UserWithTasks])
	async getUsersWithTasks(): Promise<UserWithTasks[]> {
		const users = await this.userRepo.getAllUsers();
		const taskRepo = new TaskRepository();

		const userTasks = await Promise.all(
			users.map(async user => {
				const tasks = await taskRepo.findTasksByUserId(user.id);
				return { user, tasks };
			}),
		);

		return userTasks;
	}

	/**
	 * Mutación para crear un nuevo usuario
	 *
	 * @param {CreateUser} data - DTO con datos del nuevo usuario
	 * @returns {Promise<User>} Usuario creado
	 *
	 * @example
	 * mutation {
	 *   createUser(data: { name: "Laura", email: "laura@gmail.com" }) {
	 *     id
	 *     name
	 *     email
	 *   }
	 * }
	 */
	@Mutation(() => User)
	createUser(@Arg('data') data: CreateUser): Promise<User> {
		return this.userRepo.createUser(data);
	}

	/**
	 * Mutación para actualizar los datos de un usuario
	 *
	 * @param {string} userId - ID del usuario a actualizar
	 * @param {UpdateUser} data - DTO con los nuevos campos
	 * @returns {Promise<User>} Usuario actualizado
	 *
	 * @example
	 * mutation {
	 *   updateUser(userId: "232", data: { name: "Nuevo nombre" }) {
	 *     id
	 *     name
	 *     email
	 *   }
	 * }
	 */
	@Mutation(() => User)
	updateUserById(@Arg('userId') userId: string, @Arg('data') data: UpdateUser): Promise<User> {
		return this.userRepo.updateUserById(userId, data);
	}

	/**
	 * Mutación para eliminar un usuario.
	 *
	 * @param {DeleteUser} data - DTO con el ID del usuario a eliminar
	 * @returns {Promise<Boolean>} true si se eliminó correctamente
	 *
	 * @example
	 * mutation {
	 *   delete(data: { id: "abc123" })
	 * }
	 */
	@Mutation(() => Boolean)
	async deleteUserById(@Arg('data') data: DeleteUser): Promise<Boolean> {
		await this.userRepo.deleteUserById(data.id);
		return true;
	}
}
