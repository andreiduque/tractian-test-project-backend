import { CompanyRepository } from "v1/api/company/company.entity";
import { StatusCodeEnum } from "v1/enum/status-code";
import { companyNotRegistered } from "v1/utils/company-not-registered";
import { CustomError } from "v1/utils/error";
import { UserEntity, UserRepository } from "../user.entity";

interface Injectables {
	userRepository: UserRepository;
	companyRepository: CompanyRepository;
}

export interface RegisterParams {
	companyId: string;
	name: string;
}

export const register = async (
	{ userRepository, companyRepository }: Injectables,
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

	await userRepository.save<UserEntity>(params);
};
