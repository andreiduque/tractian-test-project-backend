import { isEmptyArray } from "@techmmunity/utils";
import { CustomError } from "v1/utils/error";
import { StatusCodeEnum } from "v1/enum/status-code";
import { ENTITIES_PER_PAGE, paginateEntities } from "v1/utils/list-entities";
import { CompanyRepository } from "../company.entity";

interface Injectables {
	companyRepository: CompanyRepository;
}

export interface ListByPageParams {
	page?: number;
}

export const listByPage = async (
	{ companyRepository }: Injectables,
	{ page }: ListByPageParams,
) => {
	const listOfCompanies = await companyRepository.find({
		skip: paginateEntities(page),
		take: ENTITIES_PER_PAGE,
	});

	if (isEmptyArray(listOfCompanies)) {
		throw new CustomError(
			"No company found for this page",
			StatusCodeEnum.NOT_FOUND,
		);
	}

	return listOfCompanies;
};
