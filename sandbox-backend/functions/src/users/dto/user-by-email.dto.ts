import { Field, InputType } from "type-graphql";

@InputType()
export class UserByEmail {
  @Field()
  email!: string;
}