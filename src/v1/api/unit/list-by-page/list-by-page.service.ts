import { isEmptyArray } from "@techmmunity/utils";
import { CustomError } from "v1/utils/error";
import { StatusCodeEnum } from "v1/enum/status-code";
import { ENTITIES_PER_PAGE, paginateEntities } from "v1/utils/list-entities";
import { UnitRepository } from "../unit.entity";

interface Injectables {
	unitRepository: UnitRepository;
}

export interface ListByPageParams {
	page?: number;
	companyId: string;
}

export const listByPage = async (
	{ unitRepository }: Injectables,
	{ page, companyId }: ListByPageParams,
) => {
	const listOfUnits = await unitRepository.find({
		where: { companyId },
		skip: paginateEntities(page),
		take: ENTITIES_PER_PAGE,
	});

	if (isEmptyArray(listOfUnits)) {
		throw new CustomError(
			"No unit found for this page",
			StatusCodeEnum.NOT_FOUND,
		);
	}

	return listOfUnits;
};
