import { v4 } from "uuid";
import { listByPage } from "v1/api/user/list-by-page/list-by-page.service";
import { StatusCodeEnum } from "v1/enum/status-code";
import { userMock } from "v1/tests/mocks/user";
import { CustomError } from "v1/utils/error";

describe("listByPage service", () => {
	const validPage = 1;
	const validName = "test name";
	const validCompanyId = v4();

	let user: any;

	beforeAll(() => {
		user = userMock.doc({
			companyId: validCompanyId,
			name: validName,
		});
	});

	describe("Successful", () => {
		it("should return an array of employees", async () => {
			let result: any;

			userMock.repository.find.mockResolvedValue([user]);

			try {
				result = await listByPage(
					{
						userRepository: userMock.repository,
					},
					{
						page: validPage,
						companyId: validCompanyId,
					},
				);
			} catch (err: any) {
				result = err;
			}

			expect(result).toStrictEqual([user]);
		});

		it("should return the array of employees from the first page", async () => {
			let result: any;

			userMock.repository.find.mockResolvedValue([user]);

			try {
				result = await listByPage(
					{
						userRepository: userMock.repository,
					},
					{ companyId: validCompanyId },
				);
			} catch (err: any) {
				result = err;
			}

			expect(result).toStrictEqual([user]);
		});
	});

	describe("Failure", () => {
		it("should throw a CustomError with a No user found for this page message", async () => {
			let result: any;

			userMock.repository.find.mockResolvedValue([]);

			try {
				result = await listByPage(
					{
						userRepository: userMock.repository,
					},
					{
						page: 2,
						companyId: validCompanyId,
					},
				);
			} catch (err: any) {
				result = err;
			}

			expect(result instanceof CustomError).toBeTruthy();
			expect(result.message).toBe("No user found for this page");
			expect(result.statusCode).toBe(StatusCodeEnum.NOT_FOUND);
		});

		it("should throw a CustomError with a No user found for this page message, because of invalid companyId", async () => {
			let result: any;

			userMock.repository.find.mockResolvedValue([]);

			try {
				result = await listByPage(
					{
						userRepository: userMock.repository,
					},
					{
						page: 2,
						companyId: "123456789",
					},
				);
			} catch (err: any) {
				result = err;
			}

			expect(result instanceof CustomError).toBeTruthy();
			expect(result.message).toBe("No user found for this page");
			expect(result.statusCode).toBe(StatusCodeEnum.NOT_FOUND);
		});
	});
});
