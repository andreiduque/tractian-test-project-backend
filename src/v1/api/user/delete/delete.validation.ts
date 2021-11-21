import { StatusCodeEnum } from "v1/enum/status-code";
import { CustomError } from "v1/utils/error";
import * as yup from "yup";
import { DeleteUserParams } from "./delete.service";

const schema = yup.object().shape({
	id: yup.string().strict().required(),
});

export const validation = (params: DeleteUserParams) =>
	schema.validate(params).catch(err => {
		throw new CustomError(err.errors.join("\n"), StatusCodeEnum.BAD_REQUEST);
	}) as Promise<DeleteUserParams>;
