import { Field, InputType } from "type-graphql";

@InputType()
export class MarkTaskAsDone {
  @Field()
  taskId!: string;

  @Field()
  done!: boolean;
}