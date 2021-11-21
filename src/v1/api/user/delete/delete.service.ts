import { StatusCodeEnum } from "v1/enum/status-code";
import { CustomError } from "v1/utils/error";
import { UserRepository } from "../user.entity";

interface Injectables {
	userRepository: UserRepository;
}

export interface DeleteUserParams {
	id: string;
}

export const deleteUser = async (
	{ userRepository }: Injectables,
	{ id }: DeleteUserParams,
) => {
	const count = await userRepository.delete({ id });

	if (!count) {
		throw new CustomError("User not found", StatusCodeEnum.NOT_FOUND);
	}
};
