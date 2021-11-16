import { StatusCodeEnum } from "v1/enum/status-code";
import { Route } from "v1/types/route";
import { getCompanyRepository } from "../company.entity";
import { register } from "./register.service";
import { validation } from "./register.validation";

export const registerController: Route = async (request, reply) => {
	try {
		const validatedParams = await validation(request.body as any);

		const companyRepository = getCompanyRepository();

		await register({ companyRepository }, validatedParams);
	} catch (err: any) {
		// eslint-disable-next-line no-console
		console.error(err);

		return reply
			.status(err.statusCode || StatusCodeEnum.INTERNAL)
			.send({ error: err.message });
	}

	return reply.status(StatusCodeEnum.CREATED).send();
};
