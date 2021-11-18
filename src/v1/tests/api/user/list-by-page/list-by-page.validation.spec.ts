import { v4 } from "uuid";
import { ListByPageParams } from "v1/api/user/list-by-page/list-by-page.service";
import { validation } from "v1/api/user/list-by-page/list-by-page.validation";
import { StatusCodeEnum } from "v1/enum/status-code";
import { CustomError } from "v1/utils/error";

describe("listByPage validation", () => {
	const validPage = 1;
	const validCompanyId = v4();

	describe("Successful", () => {
		it("should return validated params (with page number)", async () => {
			let result: any;

			try {
				result = await validation({
					page: validPage,
					companyId: validCompanyId,
				});
			} catch (err: any) {
				result = err;
			}

			expect(result).toStrictEqual({
				page: validPage,
				companyId: validCompanyId,
			});
		});

		it("should return validated params (without page)", async () => {
			let result: any;

			try {
				result = await validation({ companyId: validCompanyId });
			} catch (err: any) {
				result = err;
			}

			expect(result).toStrictEqual({ companyId: validCompanyId });
		});

		it("should return validated params (with page string)", async () => {
			let result: any;

			try {
				result = await validation({
					page: String(validPage) as any,
					companyId: validCompanyId,
				});
			} catch (err: any) {
				result = err;
			}

			expect(result).toStrictEqual({
				page: validPage,
				companyId: validCompanyId,
			});
		});
	});

	describe("Invalid param", () => {
		it("should return a CustomError with a invalid param message", async () => {
			let result: any;

			try {
				result = await validation({
					page: -2,
					companyId: validCompanyId,
				});
			} catch (err: any) {
				result = err;
			}

			expect(result instanceof CustomError).toBeTruthy();
			expect(result.message).toBe("page must be greater than or equal to 1");
			expect(result.statusCode).toBe(StatusCodeEnum.BAD_REQUEST);
		});
	});

	describe("Undefined param", () => {
		it("should throw a CustomError with a undefined companyId param message", async () => {
			let result: any;

			try {
				result = await validation({
					page: 1,
				} as ListByPageParams);
			} catch (err: any) {
				result = err;
			}

			expect(result instanceof CustomError).toBeTruthy();
			expect(result.message).toBe("companyId is a required field");
			expect(result.statusCode).toBe(StatusCodeEnum.BAD_REQUEST);
		});
	});

	describe("Invalid type", () => {
		it("should return a CustomError with a invalid page type message", async () => {
			let result: any;

			try {
				result = await validation({
					page: {} as any,
					companyId: validCompanyId,
				});
			} catch (err: any) {
				result = err;
			}

			expect(result instanceof CustomError).toBeTruthy();
			expect(result.message).toBe(
				"page must be a `number` type, but the final value was: `NaN` (cast from the value `{}`).",
			);
			expect(result.statusCode).toBe(StatusCodeEnum.BAD_REQUEST);
		});

		it("should return a CustomError with a invalid companyId type message", async () => {
			let result: any;

			try {
				result = await validation({
					page: 1,
					companyId: 42 as any,
				});
			} catch (err: any) {
				result = err;
			}

			expect(result instanceof CustomError).toBeTruthy();
			expect(result.message).toBe(
				"companyId must be a `string` type, but the final value was: `42`.",
			);
			expect(result.statusCode).toBe(StatusCodeEnum.BAD_REQUEST);
		});
	});
});
