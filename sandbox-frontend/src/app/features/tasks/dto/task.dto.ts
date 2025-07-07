export class TaskDTO {
	id!: string;
	title!: string;
	description?: string;
	done!: boolean;
	assignedToUserId!: string;
}
