import { StatusCodeEnum } from "v1/enum/status-code";
import { CustomError } from "v1/utils/error";
import { UnitRepository } from "../unit.entity";

interface Injectables {
	unitRepository: UnitRepository;
}

export interface DeleteUnitParams {
	id: string;
}

export const deleteUnit = async (
	{ unitRepository }: Injectables,
	{ id }: DeleteUnitParams,
) => {
	const count = await unitRepository.delete({ id });

	if (!count) {
		throw new CustomError("Unit not found", StatusCodeEnum.NOT_FOUND);
	}
};
