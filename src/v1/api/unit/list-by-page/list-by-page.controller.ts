import { StatusCodeEnum } from "v1/enum/status-code";
import { Route } from "v1/types/route";
import { getUnitRepository } from "../unit.entity";
import { listByPage } from "./list-by-page.service";
import { validation } from "./list-by-page.validation";

export const listByPageController: Route = async (request, reply) => {
	let result;

	const params = {
		...(request.query as any),
		companyId: (request.params as any).id,
	};

	try {
		const validatedParams = await validation(params);

		const unitRepository = getUnitRepository();

		result = await listByPage(
			{
				unitRepository,
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
