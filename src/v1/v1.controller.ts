import { Router } from "express";
import { setExampleController } from "./api/example/example.controller";
import { API_VERSION } from "./config";

export const setV1Controller = (mainRouter: Router) => {
	setExampleController(mainRouter, API_VERSION);
};
