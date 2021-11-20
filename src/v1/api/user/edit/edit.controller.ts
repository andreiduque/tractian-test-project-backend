import { getCompanyRepository } from "v1/api/company/company.entity";
import { StatusCodeEnum } from "v1/enum/status-code";
import { Route } from "v1/types/route";
import { getUserRepository } from "../user.entity";
import { editUser } from "./edit.service";
import { validation } from "./edit.validation";

export const editUserController: Route = async (request, reply) => {
	const params = {
		...(request.body as any),
		id: (request.params as any).id,
	};

	try {
		const validatedParams = await validation(params);

		const companyRepository = getCompanyRepository();
		const userRepository = getUserRepository();

		await editUser({ companyRepository, userRepository }, validatedParams);
	} catch (err: any) {
		return reply
			.status(err.statusCode || StatusCodeEnum.INTERNAL)
			.send({ error: err.message });
	}

	return reply.status(StatusCodeEnum.NO_CONTENT).send({});
};
