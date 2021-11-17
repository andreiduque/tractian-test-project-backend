import { v4 } from "uuid";

export interface CreateDoc {
	id?: string;
	name: string;
	companyId: string;
}

export const doc = ({ id, name, companyId }: CreateDoc) => ({
	id: id || v4(),
	name,
	companyId,
});
