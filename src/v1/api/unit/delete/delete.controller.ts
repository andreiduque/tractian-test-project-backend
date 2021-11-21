import { StatusCodeEnum } from "v1/enum/status-code";
import { Route } from "v1/types/route";
import { getUnitRepository } from "../unit.entity";
import { deleteUnit } from "./delete.service";
import { validation } from "./delete.validation";

export const deleteUnitController: Route = async (request, reply) => {
	try {
		const validateParams = await validation(request.params as any);

		const unitRepository = getUnitRepository();

		await deleteUnit({ unitRepository }, validateParams);
	} catch (err: any) {
		return reply
			.status(err.statusCode || StatusCodeEnum.INTERNAL)
			.send({ error: err.message });
	}

	return reply.status(StatusCodeEnum.NO_CONTENT).send({});
};
