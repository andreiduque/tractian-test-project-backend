import { StatusCodeEnum } from "v1/enum/status-code";
import { CustomError } from "v1/utils/error";
import { cleanObj } from "@techmmunity/utils";
import { CompanyRepository } from "v1/api/company/company.entity";
import { companyNotRegistered } from "v1/utils/company-not-registered";
import { UnitRepository } from "../unit.entity";

interface Injectables {
	unitRepository: UnitRepository;
	companyRepository: CompanyRepository;
}

export interface EditUnitParams {
	companyId?: string;
	id: string;
	name?: string;
	description?: string;
}

export const editUnit = async (
	{ unitRepository, companyRepository }: Injectables,
	{ id, name, companyId, description }: EditUnitParams,
) => {
	const unitData = await unitRepository.findOne({ where: { id } });

	if (!unitData) {
		throw new CustomError("Unit not found", StatusCodeEnum.NOT_FOUND);
	}

	if (
		companyId &&
		(await companyNotRegistered({ companyRepository, companyId }))
	) {
		throw new CustomError("Company not registered", StatusCodeEnum.NOT_FOUND);
	}

	const paramsToUpdate = cleanObj({ id, name, companyId, description });

	await unitRepository.save(paramsToUpdate);
};
