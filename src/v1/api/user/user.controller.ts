import { Router } from "express";
import * as express from "express";
import { registerController } from "./register/register.controller";

export const setUserController = (mainRouter: Router, apiVersion: string) => {
	const userController = express.Router();

	userController.use(express.json());

	userController.post("/:id/user/register", registerController);

	mainRouter.use(`/${apiVersion}`, userController);
};
