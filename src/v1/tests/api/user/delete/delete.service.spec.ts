import { v4 } from "uuid";
import { deleteUser } from "v1/api/user/delete/delete.service";
import { StatusCodeEnum } from "v1/enum/status-code";
import { userMock } from "v1/tests/mocks/user";
import { CustomError } from "v1/utils/error";

describe("delete user service", () => {
	const validId = v4();
	const validName = "test name";
	const validCompanyId = v4();

	describe("Successful", () => {
		it("should return a status code 204 with no content", async () => {
			let result: any;

			const user = userMock.doc({
				id: validId,
				name: validName,
				companyId: validCompanyId,
			});

			userMock.repository.delete.mockResolvedValue(user);

			try {
				result = await deleteUser(
					{ userRepository: userMock.repository },
					{ id: validId },
				);
			} catch (err: any) {
				result = err;
			}

			expect(result).toBeUndefined();
			expect(userMock.repository.delete).toHaveBeenCalledWith({
				id: validId,
			});
		});
	});

	describe("Failure", () => {
		it("should throw a CustomError with a user not found message", async () => {
			let result: any;

			userMock.repository.delete(undefined);

			try {
				result = await deleteUser(
					{ userRepository: userMock.repository },
					{ id: validId },
				);
			} catch (err: any) {
				result = err;
			}

			expect(result instanceof CustomError).toBeTruthy();
			expect(result.message).toBe("User not found");
			expect(result.statusCode).toBe(StatusCodeEnum.NOT_FOUND);
		});
	});
});
