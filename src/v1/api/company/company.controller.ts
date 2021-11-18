import { Router } from "express";
import * as express from "express";
import { registerController } from "./register/register.controller";
import { listByPageController } from "./list-by-page/list-by-page.controller";

export const setCompanyController = (
	mainRouter: Router,
	apiVersion: string,
) => {
	const companyController = express.Router();

	companyController.use(express.json());

	companyController.post("/register", registerController);
	companyController.get("/list-by-page", listByPageController);

	mainRouter.use(`/${apiVersion}/company`, companyController);
};
