import { Router } from "express";
import * as express from "express";
import * as multer from "multer";
import { registerController } from "./register/register.controller";
import { editAssetController } from "./edit/edit.controller";
import { listByPage } from "./list-by-page/list-by-page.service";
import { listByPageController } from "./list-by-page/list-by-page.controller";

export const setAssetController = (mainRouter: Router, apiVersion: string) => {
	const assetController = express.Router();

	assetController.use(express.json());

	const upload = multer();

	assetController.post(
		"/:id/asset/register",
		upload.single("image"),
		registerController,
	);

	assetController.put(
		"/:id/asset/edit",
		upload.single("image"),
		editAssetController,
	);

	assetController.get("/:id/list-by-page", listByPageController);

	mainRouter.use(`/${apiVersion}`, assetController);
};
