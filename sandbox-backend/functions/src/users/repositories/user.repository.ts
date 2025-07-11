import { BaseFirestoreRepository, getRepository } from "fireorm";
import { User } from "../models/User";

/**
 * Repositorio que abstrae el acceso a la colección de usuario en Firestore(FireORM)
 */
export class UserRepository {
    /**
     * Metodo getter(privado) que retorna una instancia del repositorio tipado de FireORM para User
     * Se activa la carga perezosa (solo cuando se necesita)
     */
    private get repo(): BaseFirestoreRepository<User> {
        return getRepository(User);
    }

    /**
     * Crea un nuevo usuario en la base de datos
     *
     * @param {Partial<User>} user - Datos del usuario a crear. Puede omitir campos opcionales como el id
     * @returns {Promise<User>} El usuario creado con id asignado.
     *
     * @example
     * userRepo.createUser({ name: "Enri", email: "enrikeke@gmail.com" });
     */
    createUser(user: Partial<User>): Promise<User> {
        return this.repo.create(user as User);
    }

    /**
     * Actualiza un usuario existente, sobrescribiendo los campos provistos
     *
     * @param {string} userId - ID del usuario a actualizar
     * @param {Partial<User>} user - Campos a actualizar
     * @returns {Promise<User>} Usuario actualizado
     * @throws Error si el usuario no existe.
     *
     * @example userRepo.updateUserById("abc123", { name: "Barbara" });
     */
    async updateUserById(userId: string, user: Partial<User>): Promise<User> {
        const userFounded = await this.repo.findById(userId);

        if (!userFounded) throw new Error(`User with ID[${userId}] not founded`);

        const updatedUser: User = {
            ...userFounded,
            ...user,
        };

        return this.repo.update(updatedUser);
    }

    /**
     * Busca un usuario por su id.
     *
     * @param {string} id - ID del usuario.
     * @returns {Promise<User | null>} El usuario encontrado o null si no existe
     *
     * @example const userFounded = await userRepo.findUserById("1223A");
     */
    async findUserById(userId: string): Promise<User | null> {
        const users = await this.repo.whereEqualTo('id', userId).find();
        return users[0] || null;
    }

    /**
     * Busca un usuario por su correo electrónico.
     *
     * @param {string} email - Correo electrónico del usuario.
     * @returns {Promise<User | null>} El usuario encontrado o null si no existe
     *
     * @example const userFounded = await userRepo.findUserByEmail("louis@gmail.com");
     */
    async findUserByEmail(email: string): Promise<User | null> {
        const users = await this.repo.whereEqualTo('email', email).find();
        return users[0] || null;
    }

    /**
     * Obtiene todos los usuarios registrados
     *
     * @returns {Promise<User[]>} Lista de todos los usuarios
     *
     * @example const all = await userRepo.getAllUsers();
     */
    getAllUsers(): Promise<User[]> {
        return this.repo.find();
    }

    /**
     * Elimina un usuario de la base de datos por su ID
     *
     * @param {string} id - ID del usuario a eliminar
     * @returns {Promise<string>} Mensaje de confirmación
     *
     * @example await userRepo.deleteUserById("abc123"); // → "User with id={abc123} has deleted"
     */
    async deleteUserById(id: string): Promise<string> {
        await this.repo.delete(id);
        return `User with id={${id}} has deleted`;
    }
}