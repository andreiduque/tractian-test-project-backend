import { Router } from "express";
import { setCompanyController } from "./api/company/company.controller";
import { API_VERSION } from "./config";

export const setV1Controller = (mainRouter: Router) => {
	setCompanyController(mainRouter, API_VERSION);
};
