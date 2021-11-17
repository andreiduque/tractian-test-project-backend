import { Router } from "express";
import { setCompanyController } from "./api/company/company.controller";
import { setUserController } from "./api/user/user.controller";
import { API_VERSION } from "./config";

export const setV1Controller = (mainRouter: Router) => {
	setCompanyController(mainRouter, API_VERSION);
	setUserController(mainRouter, API_VERSION);
};
