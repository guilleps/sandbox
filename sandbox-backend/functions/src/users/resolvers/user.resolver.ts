import { Arg, Field, Mutation, ObjectType, Query, Resolver } from "type-graphql";
import { User } from "../models/User";
import { UserRepository } from "../repositories/user.repository";
import { CreateUser } from "../dto/create-user.dto";
import { Task } from "../../tasks/models/Task";
import { TaskRepository } from "../../tasks/repositories/task.repository";
import { DeleteUser } from "../dto/delete-user.dto";
import { UserByEmail } from "../dto/user-by-email.dto";
import { UpdateUser } from "../dto/update-user.dto";

@ObjectType()
class UserWithTasks {
    @Field(() => User)
    user!: User;

    @Field(() => [Task])
    tasks!: Task[];
}

@Resolver(() => User)
export class UserResolver {
    private readonly userRepo = new UserRepository();

    @Query(() => User, { nullable: true })
    async userByEmail(@Arg("data") data: UserByEmail): Promise<User | null> {
        return this.userRepo.findByEmail(data.email);
    }

    @Query(() => [User])
    async getAllUsers(): Promise<User[]> {
        return this.userRepo.getAllUsers();
    }

    @Mutation(() => User)
    async createUser(@Arg("data") data: CreateUser): Promise<User> {
        return this.userRepo.create(data);
    }

    @Mutation(() => User)
    async updateUser(@Arg("userId") userId: string, @Arg("data") data: UpdateUser): Promise<User> {
        return this.userRepo.update(userId, data);
    }

    @Mutation(() => Boolean)
    async delete(@Arg("data") data: DeleteUser): Promise<Boolean> {
        await this.userRepo.delete(data.id);
        return true;
    }

    @Query(() => [UserWithTasks])
    async getUsersWithTasks(): Promise<UserWithTasks[]> {
        const users = await this.userRepo.getAllUsers();
        const taskRepo = new TaskRepository();

        const userTasks = await Promise.all(
            users.map(async (user) => {
                const tasks = await taskRepo["repo"].whereEqualTo("assignedToUserId", user.id).find();
                return { user, tasks };
            })
        );

        return userTasks;
    }
}

// import { User } from "../models/User";
// import { UserRepository } from "../repositories/user.repository";
// import { CreateUser, DeleteUserById, GetUserByEmail } from "../graphql/dto/user.dto";

// const userRepo = new UserRepository();

// // lo que realmente debe hacer una query o mutation
// export const userResolvers = {
//     Query: {
//         userByEmail: async (_parent: unknown, args: GetUserByEmail): Promise<User | null> => {
//             return userRepo.findByEmail(args.email)
//         }
//     },
//     Mutation: {
//         createUser: async (_parent: unknown, args: CreateUser): Promise<User> => {
//             return userRepo.create(args);
//         },
//         delete: async (_parent: unknown, args: DeleteUserById): Promise<string> => {
//             return userRepo.delete(args.id);
//         }
//     },
// };
