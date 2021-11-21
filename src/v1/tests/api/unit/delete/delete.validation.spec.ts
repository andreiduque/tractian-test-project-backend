import { v4 } from "uuid";
import { DeleteUnitParams } from "v1/api/unit/delete/delete.service";
import { validation } from "v1/api/unit/delete/delete.validation";
import { StatusCodeEnum } from "v1/enum/status-code";
import { CustomError } from "v1/utils/error";

describe("delete unit validation", () => {
	const validId = v4();

	describe("Successful", () => {
		it("should return validated params", async () => {
			let result: any;

			try {
				result = await validation({ id: validId });
			} catch (err: any) {
				result = err;
			}

			expect(result).toStrictEqual({ id: validId });
		});
	});

	describe("Undefined params", () => {
		it("should throw a CustomError with a undefined id param message", async () => {
			let result: any;

			try {
				result = await validation({} as DeleteUnitParams);
			} catch (err: any) {
				result = err;
			}

			expect(result instanceof CustomError).toBeTruthy();
			expect(result.message).toBe("id is a required field");
			expect(result.statusCode).toBe(StatusCodeEnum.BAD_REQUEST);
		});
	});

	describe("Invalid type params", () => {
		it("should throw a CustomError with a invalid id type param message", async () => {
			let result: any;

			try {
				result = await validation({ id: 42 as any });
			} catch (err: any) {
				result = err;
			}

			expect(result instanceof CustomError).toBeTruthy();
			expect(result.message).toBe(
				"id must be a `string` type, but the final value was: `42`.",
			);
			expect(result.statusCode).toBe(StatusCodeEnum.BAD_REQUEST);
		});
	});
});
