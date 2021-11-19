import { StatusCodeEnum } from "v1/enum/status-code";
import { CustomError } from "v1/utils/error";
import { cleanObj } from "@techmmunity/utils";
import { CompanyRepository } from "../company.entity";

interface Injectables {
	companyRepository: CompanyRepository;
}

export interface EditCompanyParams {
	id: string;
	name?: string;
	description?: string;
}

export const editCompany = async (
	{ companyRepository }: Injectables,
	{ id, name, description }: EditCompanyParams,
) => {
	const companyData = await companyRepository.findOne({ where: { id } });

	if (!companyData) {
		throw new CustomError("Company not found", StatusCodeEnum.NOT_FOUND);
	}

	const paramsToUpdate = cleanObj({ id, name, description });

	await companyRepository.save(paramsToUpdate);
};
