import { Router } from "express";
import * as express from "express";
import { registerController } from "./register/register.controller";

export const setCompanyController = (
	mainRouter: Router,
	apiVersion: string,
) => {
	const companyController = express.Router();

	companyController.use(express.json());

	companyController.post("/register", registerController);

	mainRouter.use(`/${apiVersion}/company`, companyController);
};
