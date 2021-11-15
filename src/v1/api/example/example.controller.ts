import { Router } from "express";
import * as express from "express";
import { exampleGetController } from "./example-get/example-get.controller";

/*
 * Fastify.register(exampleController, {
 * 	prefix: `/${apiVersion}/example`,
 * });
 */

export const setExampleController = (
	mainRouter: Router,
	apiVersion: string,
) => {
	const example = express.Router();

	example.get("/get", exampleGetController);

	mainRouter.use(`/${apiVersion}/example`, example);
};
