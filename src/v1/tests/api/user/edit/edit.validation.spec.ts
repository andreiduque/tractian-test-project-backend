import { v4 } from "uuid";
import { EditUserParams } from "v1/api/user/edit/edit.service";
import { validation } from "v1/api/user/edit/edit.validation";
import { StatusCodeEnum } from "v1/enum/status-code";
import { CustomError } from "v1/utils/error";

describe("user edit validation", () => {
	const validName = "test user";
	const validId = v4();
	const validCompanyId = v4();

	describe("Successful", () => {
		it("should return validated params, with all params supplied", async () => {
			let result: any;

			try {
				result = await validation({
					id: validId,
					name: validName,
					companyId: validCompanyId,
				});
			} catch (err: any) {
				result = err;
			}

			expect(result).toStrictEqual({
				id: validId,
				name: validName,
				companyId: validCompanyId,
			});
		});

		it("should return validated params, with necessary params supplied", async () => {
			let result: any;

			try {
				result = await validation({
					id: validId,
				});
			} catch (err: any) {
				result = err;
			}

			expect(result).toStrictEqual({
				id: validId,
			});
		});
	});

	describe("Invalid params", () => {
		it("should throw a CustomError with invalid name, too short, param message", async () => {
			let result: any;

			try {
				result = await validation({
					id: validId,
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
					id: validId,
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
		it("should throw a CustomError with undefined id param message", async () => {
			let result: any;

			try {
				result = await validation({
					name: validName,
					companyId: validCompanyId,
				} as EditUserParams);
			} catch (err: any) {
				result = err;
			}

			expect(result instanceof CustomError).toBeTruthy();
			expect(result.message).toBe("id is a required field");
			expect(result.statusCode).toBe(StatusCodeEnum.BAD_REQUEST);
		});
	});

	describe("Invalid type", () => {
		it("should throw a CustomError with a invalid id type param message", async () => {
			let result: any;

			try {
				result = await validation({
					id: 42 as any,
					name: validName,
					companyId: validCompanyId,
				});
			} catch (err: any) {
				result = err;
			}

			expect(result instanceof CustomError).toBeTruthy();
			expect(result.message).toBe(
				"id must be a `string` type, but the final value was: `42`.",
			);
			expect(result.statusCode).toBe(StatusCodeEnum.BAD_REQUEST);
		});

		it("should throw a CustomError with a invalid name type param message", async () => {
			let result: any;

			try {
				result = await validation({
					id: validId,
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
					id: validId,
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
