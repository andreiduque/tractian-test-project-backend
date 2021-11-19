import { StatusCodeEnum } from "v1/enum/status-code";
import { Route } from "v1/types/route";
import { getCompanyRepository } from "../company.entity";
import { editCompany } from "./edit.service";
import { validation } from "./edit.validation";

export const editCompanyController: Route = async (request, reply) => {
	const params = {
		...(request.body as any),
		id: (request.params as any).id,
	};

	try {
		const validatedParams = await validation(params);

		const companyRepository = getCompanyRepository();

		await editCompany({ companyRepository }, validatedParams);
	} catch (err: any) {
		return reply
			.status(err.statusCode || StatusCodeEnum.INTERNAL)
			.send({ error: err.message });
	}

	return reply.status(StatusCodeEnum.NO_CONTENT).send({});
};
