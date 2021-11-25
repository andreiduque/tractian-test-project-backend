import { UnitRepository } from "v1/api/unit/unit.entity";
import { StatusCodeEnum } from "v1/enum/status-code";
import { StatusTypeEnum } from "v1/enum/status-type";
import { CustomError } from "v1/utils/error";
import { unitNotRegistered } from "v1/utils/unit-not-registered";
import { AssetEntity, AssetRepository } from "../asset.entity";

interface Injectables {
	assetRepository: AssetRepository;
	unitRepository: UnitRepository;
}

export interface RegisterParams {
	unitId: string;
	name: string;
	image: Buffer;
	description: string;
	model: string;
	owner: string;
	status: StatusTypeEnum;
	healthLevel: number;
}

export const register = async (
	{ unitRepository, assetRepository }: Injectables,
	params: RegisterParams,
) => {
	if (await unitNotRegistered({ unitRepository, unitId: params.unitId })) {
		throw new CustomError("Unit not registered", StatusCodeEnum.NOT_FOUND);
	}

	const imageBase64 = params.image.toString("base64");

	const paramsToSave = {
		...params,
		image: imageBase64,
	};

	await assetRepository.save<AssetEntity>(paramsToSave);
};
