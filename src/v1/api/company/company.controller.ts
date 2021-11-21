import { Router } from "express";
import * as express from "express";
import { registerController } from "./register/register.controller";
import { listByPageController } from "./list-by-page/list-by-page.controller";
import { editCompanyController } from "./edit/edit.controller";
import { deleteCompanyController } from "./delete/delete.controller";

export const setCompanyController = (
	mainRouter: Router,
	apiVersion: string,
) => {
	const companyController = express.Router();

	companyController.use(express.json());

	companyController.post("/register", registerController);
	companyController.get("/list-by-page", listByPageController);
	companyController.put("/:id/edit", editCompanyController);
	companyController.delete("/:id/delete", deleteCompanyController);

	mainRouter.use(`/${apiVersion}/company`, companyController);
};
