import { v4 } from "uuid";
import { StatusTypeEnum } from "v1/enum/status-type";

export interface CreateDoc {
	id?: string;
	unitId: string;
	image: string;
	name: string;
	description: string;
	model: string;
	owner: string;
	status: StatusTypeEnum;
	healthLevel: number;
}

export const doc = ({
	id,
	unitId,
	image,
	name,
	description,
	model,
	owner,
	status,
	healthLevel,
}: CreateDoc) => ({
	id: id || v4(),
	unitId,
	image,
	name,
	description,
	model,
	owner,
	status,
	healthLevel,
});
