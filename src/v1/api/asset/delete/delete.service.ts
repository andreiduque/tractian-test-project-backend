import { AssetRepository } from "../asset.entity";

interface Injectables {
	assetRepository: AssetRepository;
}

export interface DeleteAssetParams {
	id?: string;
	unitId?: string;
}

export const deleteAsset = async (
	{ assetRepository }: Injectables,
	{ id, unitId }: DeleteAssetParams,
) => {
	await assetRepository.delete([{ id }, { unitId }]);
};
