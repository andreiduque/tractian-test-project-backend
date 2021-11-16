import { v4 } from "uuid";

export interface CreateDoc {
	id?: string;
	name: string;
	description?: string;
}

export const doc = ({ id, name, description }: CreateDoc) => ({
	id: id || v4(),
	name,
	description,
});
