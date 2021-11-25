/* eslint-disable @typescript-eslint/no-magic-numbers */
import { StatusCodeEnum } from "v1/enum/status-code";
import { StatusTypeValues } from "v1/enum/status-type";
import { CustomError } from "v1/utils/error";
import * as yup from "yup";
import { EditAssetParams } from "./edit.service";

const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png", "image/bmp"];

const schema = yup.object().shape({
	id: yup.string().strict().required(),
	unitId: yup.string().strict().notRequired(),
	name: yup.string().strict().notRequired().min(3).max(200),
	image: yup
		.mixed()
		.test(
			"fileType",
			"Unsupported file format, file must be: .jpg, .jpeg, .png or .bmp",
			value =>
				value === undefined ? true : SUPPORTED_FORMATS.includes(value.mimetype),
		),
	description: yup.string().strict().notRequired().max(5000),
	model: yup.string().strict().notRequired().min(3).max(200),
	owner: yup.string().strict().notRequired().min(3).max(200),
	status: yup.string().strict().notRequired().oneOf(StatusTypeValues()),
	healthLevel: yup.number().strict().notRequired().min(0).max(100),
});

export const validation = (params: EditAssetParams) =>
	schema.validate(params).catch(err => {
		throw new CustomError(err.errors.join("\n"), StatusCodeEnum.BAD_REQUEST);
	}) as Promise<EditAssetParams>;
