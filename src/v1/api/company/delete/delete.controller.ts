import { StatusCodeEnum } from "v1/enum/status-code";
import { Route } from "v1/types/route";
import { getCompanyRepository } from "../company.entity";
import { deleteCompany } from "./delete.service";
import { validation } from "./delete.validation";

export const deleteCompanyController: Route = async (request, reply) => {
	try {
		const validateParams = await validation(request.params as any);

		const companyRepository = getCompanyRepository();

		await deleteCompany({ companyRepository }, validateParams);
	} catch (err: any) {
		return reply
			.status(err.statusCode || StatusCodeEnum.INTERNAL)
			.send({ error: err.message });
	}

	return reply.status(StatusCodeEnum.NO_CONTENT).send({});
};
