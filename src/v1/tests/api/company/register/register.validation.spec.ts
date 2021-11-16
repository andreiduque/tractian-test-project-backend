import { RegisterParams } from "v1/api/company/register/register.service";
import { validation } from "v1/api/company/register/register.validation";
import { StatusCodeEnum } from "v1/enum/status-code";
import { CustomError } from "v1/utils/error";

describe("company register validation", () => {
	const validName = "test company";
	const validDescription = "test description";

	describe("Successful", () => {
		it("should return validated params, with all params supplied", async () => {
			let result: any;

			try {
				result = await validation({
					name: validName,
					description: validDescription,
				});
			} catch (err: any) {
				result = err;
			}

			expect(result).toStrictEqual({
				name: validName,
				description: validDescription,
			});
		});

		it("should return validated params, with necessary params supplied", async () => {
			let result: any;

			try {
				result = await validation({
					name: validName,
				});
			} catch (err: any) {
				result = err;
			}

			expect(result).toStrictEqual({
				name: validName,
			});
		});
	});

	describe("Invalid params", () => {
		it("should throw a CustomError with invalid name, too short, param message", async () => {
			let result: any;

			try {
				result = await validation({
					name: "a",
					description: validDescription,
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
					description: validDescription,
				});
			} catch (err: any) {
				result = err;
			}

			expect(result instanceof CustomError).toBeTruthy();
			expect(result.message).toBe("name must be at most 200 characters");
			expect(result.statusCode).toBe(StatusCodeEnum.BAD_REQUEST);
		});

		it("should throw a CustomError with invalid description, too long, param message", async () => {
			let result: any;

			try {
				result = await validation({
					name: validName,
					description: "a".repeat(5001),
				});
			} catch (err: any) {
				result = err;
			}

			expect(result instanceof CustomError).toBeTruthy();
			expect(result.message).toBe(
				"description must be at most 5000 characters",
			);
			expect(result.statusCode).toBe(StatusCodeEnum.BAD_REQUEST);
		});
	});

	describe("Undefined params", () => {
		it("should throw a CustomError with undefined name param message", async () => {
			let result: any;

			try {
				result = await validation({
					description: validDescription,
				} as RegisterParams);
			} catch (err: any) {
				result = err;
			}

			expect(result instanceof CustomError).toBeTruthy();
			expect(result.message).toBe("name is a required field");
			expect(result.statusCode).toBe(StatusCodeEnum.BAD_REQUEST);
		});
	});

	describe("Invalid type", () => {
		it("should throw a CustomError with a invalid name type param message", async () => {
			let result: any;

			try {
				result = await validation({
					name: 42 as any,
					description: validDescription,
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

		it("should throw a CustomError with a invalid description type param message", async () => {
			let result: any;

			try {
				result = await validation({
					name: validName,
					description: 42 as any,
				});
			} catch (err: any) {
				result = err;
			}

			expect(result instanceof CustomError).toBeTruthy();
			expect(result.message).toBe(
				"description must be a `string` type, but the final value was: `42`.",
			);
			expect(result.statusCode).toBe(StatusCodeEnum.BAD_REQUEST);
		});
	});
});
