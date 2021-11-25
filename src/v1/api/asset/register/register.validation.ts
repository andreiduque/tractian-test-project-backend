/* eslint-disable @typescript-eslint/no-magic-numbers */
import { StatusCodeEnum } from "v1/enum/status-code";
import { StatusTypeValues } from "v1/enum/status-type";
import { CustomError } from "v1/utils/error";
import * as yup from "yup";
import { RegisterParams } from "./register.service";

const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png", "image/bmp"];

const schema = yup.object().shape({
	unitId: yup.string().strict().required(),
	name: yup.string().strict().required().min(3).max(200),
	image: yup
		.mixed()
		.required()
		.test(
			"fileType",
			"Unsupported file format, file must be: .jpg, .jpeg, .png or .bmp",
			value => (value ? SUPPORTED_FORMATS.includes(value.mimetype) : false),
		),
	description: yup.string().strict().required().max(5000),
	model: yup.string().strict().required().min(3).max(200),
	owner: yup.string().strict().required().min(3).max(200),
	status: yup.string().strict().required().oneOf(StatusTypeValues()),
	healthLevel: yup.number().strict().required().min(0).max(100),
});

export const validation = (params: RegisterParams) =>
	schema.validate(params).catch(err => {
		throw new CustomError(err.errors.join("\n"), StatusCodeEnum.BAD_REQUEST);
	}) as Promise<RegisterParams>;
