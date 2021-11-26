import { isEmptyArray } from "@techmmunity/utils";
import { CustomError } from "v1/utils/error";
import { StatusCodeEnum } from "v1/enum/status-code";
import { ENTITIES_PER_PAGE, paginateEntities } from "v1/utils/list-entities";
import { AssetRepository } from "../asset.entity";

interface Injectables {
	assetRepository: AssetRepository;
}

export interface ListByPageParams {
	page?: number;
	unitId: string;
}

export const listByPage = async (
	{ assetRepository }: Injectables,
	{ page, unitId }: ListByPageParams,
) => {
	const listOfAssets = await assetRepository.find({
		where: { unitId },
		skip: paginateEntities(page),
		take: ENTITIES_PER_PAGE,
	});

	if (isEmptyArray(listOfAssets)) {
		throw new CustomError(
			"No asset found for this page",
			StatusCodeEnum.NOT_FOUND,
		);
	}

	return listOfAssets;
};
