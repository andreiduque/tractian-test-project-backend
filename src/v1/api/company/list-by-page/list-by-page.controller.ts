import { StatusCodeEnum } from "v1/enum/status-code";
import { Route } from "v1/types/route";
import { getCompanyRepository } from "../company.entity";
import { listByPage } from "./list-by-page.service";
import { validation } from "./list-by-page.validation";

export const listByPageController: Route = async (request, reply) => {
	let result;

	try {
		const validatedParams = await validation(request.query);

		const companyRepository = getCompanyRepository();

		result = await listByPage(
			{
				companyRepository,
			},
			validatedParams,
		);
	} catch (err: any) {
		// eslint-disable-next-line no-console
		console.error(err);

		return reply
			.status(err.statusCode || StatusCodeEnum.INTERNAL)
			.send({ error: err.message });
	}

	return reply.send(result);
};
