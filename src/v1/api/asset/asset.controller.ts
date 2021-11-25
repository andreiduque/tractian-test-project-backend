import { Router } from "express";
import * as express from "express";
import * as multer from "multer";
import { registerController } from "./register/register.controller";

export const setAssetController = (mainRouter: Router, apiVersion: string) => {
	const assetController = express.Router();

	assetController.use(express.json());

	const upload = multer();

	assetController.post(
		"/:id/asset/register",
		upload.single("image"),
		registerController,
	);

	mainRouter.use(`/${apiVersion}`, assetController);
};
