import { v4 } from "uuid";
import { validation } from "v1/api/asset/delete/delete.validation";
import { StatusCodeEnum } from "v1/enum/status-code";
import { CustomError } from "v1/utils/error";

describe("delete asset validation", () => {
	const validId = v4();
	const validUnitId = v4();

	describe("Successful", () => {
		it("should return validated params", async () => {
			let result: any;

			try {
				result = await validation({ id: validId, unitId: validUnitId });
			} catch (err: any) {
				result = err;
			}

			expect(result).toStrictEqual({ id: validId, unitId: validUnitId });
		});
	});

	describe("Invalid type params", () => {
		it("should throw a CustomError with a invalid id type param message", async () => {
			let result: any;

			try {
				result = await validation({ id: 42 as any, unitId: validUnitId });
			} catch (err: any) {
				result = err;
			}

			expect(result instanceof CustomError).toBeTruthy();
			expect(result.message).toBe(
				"id must be a `string` type, but the final value was: `42`.",
			);
			expect(result.statusCode).toBe(StatusCodeEnum.BAD_REQUEST);
		});

		it("should throw a CustomError with a invalid unitId type param message", async () => {
			let result: any;

			try {
				result = await validation({ id: validId, unitId: 42 as any });
			} catch (err: any) {
				result = err;
			}

			expect(result instanceof CustomError).toBeTruthy();
			expect(result.message).toBe(
				"unitId must be a `string` type, but the final value was: `42`.",
			);
			expect(result.statusCode).toBe(StatusCodeEnum.BAD_REQUEST);
		});
	});
});
