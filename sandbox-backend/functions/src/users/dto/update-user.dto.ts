import { Field, InputType } from "type-graphql";

@InputType()
export class UpdateUser {
  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  email?: string;
}