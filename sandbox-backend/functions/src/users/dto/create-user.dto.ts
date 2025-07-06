import { Field, InputType } from "type-graphql";

@InputType()
export class CreateUser {
  @Field()
  name!: string;

  @Field()
  email!: string;
}