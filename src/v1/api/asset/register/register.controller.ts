import { getUnitRepository } from "v1/api/unit/unit.entity";
import { StatusCodeEnum } from "v1/enum/status-code";
import { Route } from "v1/types/route";
import { getAssetRepository } from "../asset.entity";
import { register } from "./register.service";
import { validation } from "./register.validation";

export const registerController: Route = async (request, reply) => {
	const params = {
		...(request.body as any),
		unitId: (request.params as any).id,
		image: request.file,
		healthLevel: parseInt(request.body.healthLevel, 10),
	};

	try {
		const validatedParams = await validation(params);

		const assetRepository = getAssetRepository();

		const unitRepository = getUnitRepository();

		await register(
			{ unitRepository, assetRepository },
			{ ...validatedParams, image: params.image.buffer },
		);
	} catch (err: any) {
		return reply
			.status(err.statusCode || StatusCodeEnum.INTERNAL)
			.send({ error: err.message });
	}

	return reply.status(StatusCodeEnum.CREATED).send();
};
