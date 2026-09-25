export type TaskStatus = 'todo' | 'in-progress' | 'done';

export interface Task {
	id: string;
	name: string;
	description: string;
	deadline: string | null;
	importance: number;
	urgency: number;
	status: TaskStatus;
}
