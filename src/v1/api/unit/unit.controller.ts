import { Router } from "express";
import * as express from "express";

export const setUnitController = (mainRouter: Router, apiVersion: string) => {
	const unitController = express.Router();

	unitController.use(express.json());

	unitController.post("/register");

	mainRouter.use(`/${apiVersion}/company`, unitController);
};
