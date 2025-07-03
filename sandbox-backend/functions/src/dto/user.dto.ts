import { Field, InputType } from "type-graphql";

@InputType()
export class CreateUser {
  @Field()
  name!: string;

  @Field()
  email!: string;
}

@InputType()
export class GetUserByEmail {
  @Field()
  email!: string;
}

@InputType()
export class DeleteUserById {
  @Field()
  id!: string;
}