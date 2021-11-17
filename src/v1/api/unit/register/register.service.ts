import { CompanyRepository } from "v1/api/company/company.entity";
import { companyNotRegistered } from "v1/api/user/helpers/company-not-registered";
import { StatusCodeEnum } from "v1/enum/status-code";
import { CustomError } from "v1/utils/error";
import { UnitEntity, UnitRepository } from "../unit.entity";

interface Injectables {
	unitRepository: UnitRepository;
	companyRepository: CompanyRepository;
}

export interface RegisterParams {
	companyId: string;
	name: string;
	description?: string;
}

export const register = async (
	{ unitRepository, companyRepository }: Injectables,
	params: RegisterParams,
) => {
	if (
		await companyNotRegistered({
			companyRepository,
			companyId: params.companyId,
		})
	) {
		throw new CustomError("Company not registered", StatusCodeEnum.NOT_FOUND);
	}

	await unitRepository.save<UnitEntity>(params);
};
