import { Router } from "express";
import * as express from "express";
import { registerController } from "./register/register.controller";
import { listByPageController } from "./list-by-page/list-by-page.controller";
import { editUnitController } from "./edit/edit.controller";
import { deleteUnitController } from "./delete/delete.controller";

export const setUnitController = (mainRouter: Router, apiVersion: string) => {
	const unitController = express.Router();

	unitController.use(express.json());

	unitController.post("/:id/unit/register", registerController);
	unitController.get("/:id/unit/list-by-page", listByPageController);
	unitController.put("/unit/:id/edit", editUnitController);
	unitController.delete("/unit/:id/delete", deleteUnitController);

	mainRouter.use(`/${apiVersion}`, unitController);
};
