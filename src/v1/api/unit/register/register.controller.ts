import { getCompanyRepository } from "v1/api/company/company.entity";
import { getUserRepository } from "v1/api/user/user.entity";
import { StatusCodeEnum } from "v1/enum/status-code";
import { Route } from "v1/types/route";
import { register } from "./register.service";
import { validation } from "./register.validation";

export const registerController: Route = async (request, reply) => {
	const params = {
		...(request.body as any),
		companyId: (request.params as any).id,
	};

	try {
		const validatedParams = await validation(params);

		const unitRepository = getUserRepository();

		const companyRepository = getCompanyRepository();

		await register({ unitRepository, companyRepository }, validatedParams);
	} catch (err: any) {
		return reply
			.status(err.statusCode || StatusCodeEnum.INTERNAL)
			.send({ error: err.message });
	}

	return reply.status(StatusCodeEnum.CREATED).send();
};
