import { StatusCodeEnum } from "v1/enum/status-code";
import { Route } from "v1/types/route";
import { getUserRepository } from "../user.entity";
import { deleteUser } from "./delete.service";
import { validation } from "./delete.validation";

export const deleteUserController: Route = async (request, reply) => {
	try {
		const validateParams = await validation(request.params as any);

		const userRepository = getUserRepository();

		await deleteUser({ userRepository }, validateParams);
	} catch (err: any) {
		return reply
			.status(err.statusCode || StatusCodeEnum.INTERNAL)
			.send({ error: err.message });
	}

	return reply.status(StatusCodeEnum.NO_CONTENT).send({});
};
