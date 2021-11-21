import { companyNotRegistered } from "v1/api/user/helpers/company-not-registered";
import { StatusCodeEnum } from "v1/enum/status-code";
import { CustomError } from "v1/utils/error";
import { CompanyRepository } from "../company.entity";

interface Injectables {
	companyRepository: CompanyRepository;
}

export interface DeleteCompanyParams {
	id: string;
}

export const deleteCompany = async (
	{ companyRepository }: Injectables,
	{ id }: DeleteCompanyParams,
) => {
	if (await companyNotRegistered({ companyRepository, companyId: id })) {
		throw new CustomError("Company not registered", StatusCodeEnum.NOT_FOUND);
	}

	await companyRepository.delete({ id });
};
