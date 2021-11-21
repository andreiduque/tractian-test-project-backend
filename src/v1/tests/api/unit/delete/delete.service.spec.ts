import { v4 } from "uuid";
import { deleteUnit } from "v1/api/unit/delete/delete.service";
import { StatusCodeEnum } from "v1/enum/status-code";
import { unitMock } from "v1/tests/mocks/unit";
import { CustomError } from "v1/utils/error";

describe("delete unit service", () => {
	const validId = v4();
	const validName = "test name";
	const validCompanyId = v4();

	describe("Successful", () => {
		it("should return a status code 204 with no content", async () => {
			let result: any;

			const unit = unitMock.doc({
				id: validId,
				name: validName,
				companyId: validCompanyId,
			});

			unitMock.repository.delete.mockResolvedValue(unit);

			try {
				result = await deleteUnit(
					{ unitRepository: unitMock.repository },
					{ id: validId },
				);
			} catch (err: any) {
				result = err;
			}

			expect(result).toBeUndefined();
			expect(unitMock.repository.delete).toHaveBeenCalledWith({
				id: validId,
			});
		});
	});

	describe("Failure", () => {
		it("should throw a CustomError with a unit not found message", async () => {
			let result: any;

			unitMock.repository.delete(undefined);

			try {
				result = await deleteUnit(
					{ unitRepository: unitMock.repository },
					{ id: validId },
				);
			} catch (err: any) {
				result = err;
			}

			expect(result instanceof CustomError).toBeTruthy();
			expect(result.message).toBe("Unit not found");
			expect(result.statusCode).toBe(StatusCodeEnum.NOT_FOUND);
		});
	});
});
