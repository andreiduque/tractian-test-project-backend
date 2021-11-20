import { Router } from "express";
import * as express from "express";
import { registerController } from "./register/register.controller";
import { listByPageController } from "./list-by-page/list-by-page.controller";
import { editUserController } from "./edit/edit.controller";

export const setUserController = (mainRouter: Router, apiVersion: string) => {
	const userController = express.Router();

	userController.use(express.json());

	userController.post("/:id/user/register", registerController);
	userController.get("/:id/user/list-by-page", listByPageController);
	userController.put("/user/:id/edit", editUserController);

	mainRouter.use(`/${apiVersion}`, userController);
};
