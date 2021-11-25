import { StatusCodeEnum } from "v1/enum/status-code";
import { CustomError } from "v1/utils/error";
import { cleanObj } from "@techmmunity/utils";
import { CompanyRepository } from "v1/api/company/company.entity";
import { companyNotRegistered } from "v1/utils/company-not-registered";
import { UserRepository } from "../user.entity";

interface Injectables {
	userRepository: UserRepository;
	companyRepository: CompanyRepository;
}

export interface EditUserParams {
	companyId?: string;
	id: string;
	name?: string;
}

export const editUser = async (
	{ userRepository, companyRepository }: Injectables,
	{ id, name, companyId }: EditUserParams,
) => {
	const userData = await userRepository.findOne({ where: { id } });

	if (!userData) {
		throw new CustomError("User not found", StatusCodeEnum.NOT_FOUND);
	}

	if (
		companyId &&
		(await companyNotRegistered({ companyRepository, companyId }))
	) {
		throw new CustomError("Company not registered", StatusCodeEnum.NOT_FOUND);
	}

	const paramsToUpdate = cleanObj({ id, name, companyId });

	await userRepository.save(paramsToUpdate);
};
