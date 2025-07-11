import { IsEmail } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType()
export class UserByEmail {
  @Field()
  @IsEmail()
  email!: string;
}