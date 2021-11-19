import { v4 } from "uuid";
import { listByPage } from "v1/api/unit/list-by-page/list-by-page.service";
import { StatusCodeEnum } from "v1/enum/status-code";
import { unitMock } from "v1/tests/mocks/unit";
import { CustomError } from "v1/utils/error";

describe("unit listByPage service", () => {
	const validPage = 1;
	const validName = "test name";
	const validCompanyId = v4();

	let unit: any;

	beforeAll(() => {
		unit = unitMock.doc({
			companyId: validCompanyId,
			name: validName,
		});
	});

	describe("Successful", () => {
		it("should return an array of units", async () => {
			let result: any;

			unitMock.repository.find.mockResolvedValue([unit]);

			try {
				result = await listByPage(
					{
						unitRepository: unitMock.repository,
					},
					{
						page: validPage,
						companyId: validCompanyId,
					},
				);
			} catch (err: any) {
				result = err;
			}

			expect(result).toStrictEqual([unit]);
		});

		it("should return the array of units from the first page", async () => {
			let result: any;

			unitMock.repository.find.mockResolvedValue([unit]);

			try {
				result = await listByPage(
					{
						unitRepository: unitMock.repository,
					},
					{ companyId: validCompanyId },
				);
			} catch (err: any) {
				result = err;
			}

			expect(result).toStrictEqual([unit]);
		});
	});

	describe("Failure", () => {
		it("should throw a CustomError with a No unit found for this page message", async () => {
			let result: any;

			unitMock.repository.find.mockResolvedValue([]);

			try {
				result = await listByPage(
					{
						unitRepository: unitMock.repository,
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
			expect(result.message).toBe("No unit found for this page");
			expect(result.statusCode).toBe(StatusCodeEnum.NOT_FOUND);
		});

		it("should throw a CustomError with a No unit found for this page message, because of invalid companyId", async () => {
			let result: any;

			unitMock.repository.find.mockResolvedValue([]);

			try {
				result = await listByPage(
					{
						unitRepository: unitMock.repository,
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
			expect(result.message).toBe("No unit found for this page");
			expect(result.statusCode).toBe(StatusCodeEnum.NOT_FOUND);
		});
	});
});
