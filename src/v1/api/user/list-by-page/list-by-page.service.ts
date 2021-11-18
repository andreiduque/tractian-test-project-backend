import { isEmptyArray } from "@techmmunity/utils";
import { CustomError } from "v1/utils/error";
import { StatusCodeEnum } from "v1/enum/status-code";
import { ENTITIES_PER_PAGE, paginateEntities } from "v1/utils/list-entities";
import { UserRepository } from "../user.entity";

interface Injectables {
	userRepository: UserRepository;
}

export interface ListByPageParams {
	page?: number;
	companyId: string;
}

export const listByPage = async (
	{ userRepository }: Injectables,
	{ page, companyId }: ListByPageParams,
) => {
	const listOfUsers = await userRepository.find({
		where: { companyId },
		skip: paginateEntities(page),
		take: ENTITIES_PER_PAGE,
	});

	if (isEmptyArray(listOfUsers)) {
		throw new CustomError(
			"No user found for this page",
			StatusCodeEnum.NOT_FOUND,
		);
	}

	return listOfUsers;
};
