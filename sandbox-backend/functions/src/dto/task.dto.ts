import { Field, InputType } from "type-graphql";

@InputType()
export class CreateTask {
  @Field()
  title!: string;

  @Field({ nullable: true })
  description?: string;

  @Field(() => Boolean, { defaultValue: false, nullable: true })
  done!: boolean;

  @Field()
  assignedToUserId!: string;
}

@InputType()
export class MarkTaskAsDone {
  @Field()
  taskId!: string;
}

@InputType()
export class DeleteTask {
  @Field()
  taskId!: string;
}
