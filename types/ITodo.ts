export interface ITodo {
	id: number;
	title: string;
	description?: string;
	completed: boolean;
	DateCreated: string;
	DateEdited?: string;
	images?: string[];
}
