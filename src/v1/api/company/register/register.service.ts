import { StatusCodeEnum } from "v1/enum/status-code";
import { CustomError } from "v1/utils/error";
import { CompanyEntity, CompanyRepository } from "../company.entity";
import { hasCompanyWithSameName } from "../helpers/has-company-with-same-name";

interface Injectables {
	companyRepository: CompanyRepository;
}

export interface RegisterParams {
	name: string;
	description?: string;
}

export const register = async (
	{ companyRepository }: Injectables,
	params: RegisterParams,
) => {
	if (
		await hasCompanyWithSameName({
			companyRepository,
			name: params.name,
		})
	) {
		throw new CustomError(
			"Company with same name already registered",
			StatusCodeEnum.CONFLICT,
		);
	}

	await companyRepository.save<CompanyEntity>(params);
};
