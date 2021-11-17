import { v4 } from "uuid";

export interface CreateDoc {
	id?: string;
	name: string;
	companyId: string;
	description?: string;
}

export const doc = ({ id, name, companyId, description }: CreateDoc) => ({
	id: id || v4(),
	name,
	companyId,
	description,
});
