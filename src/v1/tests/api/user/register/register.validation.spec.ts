import { v4 } from "uuid";
import { RegisterParams } from "v1/api/user/register/register.service";
import { validation } from "v1/api/user/register/register.validation";
import { StatusCodeEnum } from "v1/enum/status-code";
import { CustomError } from "v1/utils/error";

describe("user register validation", () => {
	const validName = "test user";
	const validCompanyId = v4();

	describe("Successful", () => {
		it("should return validated params", async () => {
			let result: any;

			try {
				result = await validation({
					name: validName,
					companyId: validCompanyId,
				});
			} catch (err: any) {
				result = err;
			}

			expect(result).toStrictEqual({
				name: validName,
				companyId: validCompanyId,
			});
		});
	});

	describe("Invalid params", () => {
		it("should throw a CustomError with invalid name, too short, param message", async () => {
			let result: any;

			try {
				result = await validation({
					name: "a",
					companyId: validCompanyId,
				});
			} catch (err: any) {
				result = err;
			}

			expect(result instanceof CustomError).toBeTruthy();
			expect(result.message).toBe("name must be at least 3 characters");
			expect(result.statusCode).toBe(StatusCodeEnum.BAD_REQUEST);
		});

		it("should throw a CustomError with invalid name, too long, param message", async () => {
			let result: any;

			try {
				result = await validation({
					name: "a".repeat(201),
					companyId: validCompanyId,
				});
			} catch (err: any) {
				result = err;
			}

			expect(result instanceof CustomError).toBeTruthy();
			expect(result.message).toBe("name must be at most 200 characters");
			expect(result.statusCode).toBe(StatusCodeEnum.BAD_REQUEST);
		});
	});

	describe("Undefined params", () => {
		it("should throw a CustomError with undefined name param message", async () => {
			let result: any;

			try {
				result = await validation({
					companyId: validCompanyId,
				} as RegisterParams);
			} catch (err: any) {
				result = err;
			}

			expect(result instanceof CustomError).toBeTruthy();
			expect(result.message).toBe("name is a required field");
			expect(result.statusCode).toBe(StatusCodeEnum.BAD_REQUEST);
		});

		it("should throw a CustomError with undefined companyId param message", async () => {
			let result: any;

			try {
				result = await validation({
					name: validName,
				} as RegisterParams);
			} catch (err: any) {
				result = err;
			}

			expect(result instanceof CustomError).toBeTruthy();
			expect(result.message).toBe("companyId is a required field");
			expect(result.statusCode).toBe(StatusCodeEnum.BAD_REQUEST);
		});
	});

	describe("Invalid type", () => {
		it("should throw a CustomError with a invalid name type param message", async () => {
			let result: any;

			try {
				result = await validation({
					name: 42 as any,
					companyId: validCompanyId,
				});
			} catch (err: any) {
				result = err;
			}

			expect(result instanceof CustomError).toBeTruthy();
			expect(result.message).toBe(
				"name must be a `string` type, but the final value was: `42`.",
			);
			expect(result.statusCode).toBe(StatusCodeEnum.BAD_REQUEST);
		});

		it("should throw a CustomError with a invalid companyId type param message", async () => {
			let result: any;

			try {
				result = await validation({
					name: validName,
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
