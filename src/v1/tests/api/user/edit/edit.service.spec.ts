import { v4 } from "uuid";
import { editUser } from "v1/api/user/edit/edit.service";
import { StatusCodeEnum } from "v1/enum/status-code";
import { companyMock } from "v1/tests/mocks/company";
import { userMock } from "v1/tests/mocks/user";
import { CustomError } from "v1/utils/error";

describe("user edit service", () => {
	const validName = "test user";
	const validId = v4();
	const validCompanyId = v4();
	const validCompanyName = "test company";

	describe("Successful", () => {
		it("should return a status code 204 with no content, with all params supplied", async () => {
			let result: any;

			const user = userMock.doc({
				id: validId,
				name: validName,
				companyId: validCompanyId,
			});

			const company = companyMock.doc({
				id: validCompanyId,
				name: validCompanyName,
			});

			userMock.repository.findOne.mockResolvedValue(user);

			companyMock.repository.findOne.mockResolvedValue(company);

			userMock.repository.save.mockResolvedValue(user);

			try {
				await editUser(
					{
						companyRepository: companyMock.repository,
						userRepository: userMock.repository,
					},
					{ id: validId, name: validName, companyId: validCompanyId },
				);
			} catch (err: any) {
				result = err;
			}

			expect(result).toBeUndefined();
			expect(userMock.repository.save).toHaveBeenCalledWith(
				expect.objectContaining({
					id: validId,
					name: validName,
					companyId: validCompanyId,
				}),
			);
		});

		it("should return a status code 204 with no content, with only necessary params supplied", async () => {
			let result: any;

			const user = userMock.doc({
				id: validId,
				name: validName,
				companyId: validCompanyId,
			});

			const company = companyMock.doc({
				id: validCompanyId,
				name: validCompanyName,
			});

			userMock.repository.findOne.mockResolvedValue(user);

			companyMock.repository.findOne.mockResolvedValue(company);

			userMock.repository.save.mockResolvedValue(user);

			try {
				await editUser(
					{
						companyRepository: companyMock.repository,
						userRepository: userMock.repository,
					},
					{ id: validId },
				);
			} catch (err: any) {
				result = err;
			}

			expect(result).toBeUndefined();
			expect(userMock.repository.save).toHaveBeenCalledWith(
				expect.objectContaining({
					id: validId,
				}),
			);
		});
	});

	describe("Failure", () => {
		it("should throw a CustomError with a user not found message", async () => {
			let result: any;

			userMock.repository.findOne.mockResolvedValue(undefined);

			try {
				result = await editUser(
					{
						userRepository: userMock.repository,
						companyRepository: companyMock.repository,
					},
					{ id: "invalid user id" },
				);
			} catch (err: any) {
				result = err;
			}

			expect(result instanceof CustomError).toBeTruthy();
			expect(result.message).toBe("User not found");
			expect(result.statusCode).toBe(StatusCodeEnum.NOT_FOUND);
		});

		it("should throw a CustomError with a company not registered message", async () => {
			let result: any;

			const user = userMock.doc({
				id: validId,
				name: validName,
				companyId: validCompanyId,
			});

			userMock.repository.findOne.mockResolvedValue(user);

			companyMock.repository.findOne.mockResolvedValue(undefined);

			try {
				result = await editUser(
					{
						userRepository: userMock.repository,
						companyRepository: companyMock.repository,
					},
					{ id: validId, companyId: "invalid company id" },
				);
			} catch (err: any) {
				result = err;
			}

			expect(result instanceof CustomError).toBeTruthy();
			expect(result.message).toBe("Company not registered");
			expect(result.statusCode).toBe(StatusCodeEnum.NOT_FOUND);
		});
	});
});
