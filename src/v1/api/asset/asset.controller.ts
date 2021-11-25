import { Router } from "express";
import * as express from "express";
import * as multer from "multer";
import { registerController } from "./register/register.controller";
import { editAssetController } from "./edit/edit.controller";

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

	mainRouter.use(`/${apiVersion}`, assetController);
};
