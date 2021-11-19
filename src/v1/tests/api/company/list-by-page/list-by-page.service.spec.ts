import { listByPage } from "v1/api/company/list-by-page/list-by-page.service";
import { StatusCodeEnum } from "v1/enum/status-code";
import { companyMock } from "v1/tests/mocks/company";
import { CustomError } from "v1/utils/error";

describe("company listByPage service", () => {
	const validPage = 1;
	const validName = "test name";

	let company: any;

	beforeAll(() => {
		company = companyMock.doc({
			name: validName,
		});
	});

	describe("Successful", () => {
		it("should return an array of companies", async () => {
			let result: any;

			companyMock.repository.find.mockResolvedValue([company]);

			try {
				result = await listByPage(
					{
						companyRepository: companyMock.repository,
					},
					{
						page: validPage,
					},
				);
			} catch (err: any) {
				result = err;
			}

			expect(result).toStrictEqual([company]);
		});

		it("should return the array of companies from the first page", async () => {
			let result: any;

			companyMock.repository.find.mockResolvedValue([company]);

			try {
				result = await listByPage(
					{
						companyRepository: companyMock.repository,
					},
					{},
				);
			} catch (err: any) {
				result = err;
			}

			expect(result).toStrictEqual([company]);
		});
	});

	describe("Failure", () => {
		it("should throw a CustomError with a No company found for this page message", async () => {
			let result: any;

			companyMock.repository.find.mockResolvedValue([]);

			try {
				result = await listByPage(
					{
						companyRepository: companyMock.repository,
					},
					{
						page: 2,
					},
				);
			} catch (err: any) {
				result = err;
			}

			expect(result instanceof CustomError).toBeTruthy();
			expect(result.message).toBe("No company found for this page");
			expect(result.statusCode).toBe(StatusCodeEnum.NOT_FOUND);
		});
	});
});
