import { StatusCodeEnum } from "v1/enum/status-code";
import { CustomError } from "v1/utils/error";
import { cleanObj } from "@techmmunity/utils";
import { StatusTypeEnum } from "v1/enum/status-type";
import { UnitRepository } from "v1/api/unit/unit.entity";
import { unitNotRegistered } from "v1/utils/unit-not-registered";
import { AssetRepository } from "../asset.entity";

interface Injectables {
	assetRepository: AssetRepository;
	unitRepository: UnitRepository;
}

export interface EditAssetParams {
	id: string;
	unitId?: string;
	name?: string;
	image?: Buffer;
	description?: string;
	model?: string;
	owner?: string;
	status?: StatusTypeEnum;
	healthLevel?: number;
}

export const editAsset = async (
	{ assetRepository, unitRepository }: Injectables,
	{
		id,
		name,
		unitId,
		description,
		image,
		model,
		owner,
		status,
		healthLevel,
	}: EditAssetParams,
) => {
	const assetData = await assetRepository.findOne({ where: { id } });

	if (!assetData) {
		throw new CustomError("Asset not found", StatusCodeEnum.NOT_FOUND);
	}

	if (unitId && (await unitNotRegistered({ unitRepository, unitId }))) {
		throw new CustomError("Unit not registered", StatusCodeEnum.NOT_FOUND);
	}

	const paramsToUpdate = cleanObj({
		id,
		name,
		unitId,
		description,
		image: image?.toString("base64"),
		model,
		owner,
		status,
		healthLevel,
	});

	await assetRepository.save(paramsToUpdate);
};
