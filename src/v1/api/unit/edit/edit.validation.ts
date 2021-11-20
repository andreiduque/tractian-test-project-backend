/* eslint-disable @typescript-eslint/no-magic-numbers */
import { StatusCodeEnum } from "v1/enum/status-code";
import { CustomError } from "v1/utils/error";
import * as yup from "yup";
import { EditUnitParams } from "./edit.service";

const schema = yup.object().shape({
	id: yup.string().strict().required(),
	name: yup.string().strict().notRequired().min(3).max(200),
	companyId: yup.string().strict().notRequired(),
	description: yup.string().strict().notRequired().max(5000),
});

export const validation = (params: EditUnitParams) =>
	schema.validate(params).catch(err => {
		throw new CustomError(err.errors.join("\n"), StatusCodeEnum.BAD_REQUEST);
	}) as Promise<EditUnitParams>;
