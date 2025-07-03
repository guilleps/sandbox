import { BaseFirestoreRepository, getRepository } from "fireorm";
import { User } from "../models/User";

// abstraemos la llamada/accesso a firestore
export class UserRepository {
    private get repo(): BaseFirestoreRepository<User> {
        return getRepository(User); // solo cuando se necesita
    }

    async create(user: Partial<User>): Promise<User> { // partial para ignorar id
        return this.repo.create(user as User);
    }

    async findByEmail(email: string): Promise<User | null> {
        const users = await this.repo.whereEqualTo('email', email).find();
        return users[0] || null;
    }

    async getAllUsers(): Promise<User[]> {
        return await this.repo.find();
    }

    async delete(id: string): Promise<string> {
        await this.repo.delete(id);
        return `User with id={${id}} has deleted`;
    }
}