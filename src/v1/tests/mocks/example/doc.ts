export interface CreateDoc {
	id?: string;
	exampleField: string;
}

export const doc = ({ id, exampleField }: CreateDoc) => ({
	id: id || "xxxxxxxxxxx",
	exampleField,
});
