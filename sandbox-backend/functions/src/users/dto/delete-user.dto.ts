import { Field, InputType } from "type-graphql";

@InputType()
export class DeleteUser {
  @Field()
  id!: string;
}