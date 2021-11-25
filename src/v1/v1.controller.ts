import { Router } from "express";
import { setAssetController } from "./api/asset/asset.controller";
import { setCompanyController } from "./api/company/company.controller";
import { setUnitController } from "./api/unit/unit.controller";
import { setUserController } from "./api/user/user.controller";
import { API_VERSION } from "./config";

export const setV1Controller = (mainRouter: Router) => {
	setCompanyController(mainRouter, API_VERSION);
	setUserController(mainRouter, API_VERSION);
	setUnitController(mainRouter, API_VERSION);
	setAssetController(mainRouter, API_VERSION);
};
