import { IsBoolean, IsNotEmpty } from 'class-validator';
import { Field, InputType } from 'type-graphql';

@InputType()
export class MarkTaskAsDone {
	@Field()
	@IsNotEmpty()
	taskId!: string;

	@Field()
	@IsBoolean()
	done!: boolean;
}
