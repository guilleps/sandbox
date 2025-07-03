import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { User } from "../models/User";
import { UserRepository } from "../repositories/user.repository";
import { CreateUser } from "../dto/user.dto";

@Resolver(() => User)
export class UserResolver {
    private readonly userRepo = new UserRepository();

    @Query(() => User, { nullable: true })
    async userByEmail(@Arg("email") email: string): Promise<User | null> {
        return this.userRepo.findByEmail(email);
    }

    @Query(() => [User])
    async getAllUsers(): Promise<User[]> {
        return this.userRepo.getAllUsers();
    }

    @Mutation(() => User)
    async createUser(@Arg("data") data: CreateUser): Promise<User> {
        return this.userRepo.create(data);
    }

    @Mutation(() => Boolean)
    async delete(@Arg("userId") userId: string): Promise<Boolean> {
        await this.userRepo.delete(userId);
        return true;
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
