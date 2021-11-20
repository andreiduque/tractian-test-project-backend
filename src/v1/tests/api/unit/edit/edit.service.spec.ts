import { v4 } from "uuid";
import { editUnit } from "v1/api/unit/edit/edit.service";
import { StatusCodeEnum } from "v1/enum/status-code";
import { companyMock } from "v1/tests/mocks/company";
import { unitMock } from "v1/tests/mocks/unit";
import { CustomError } from "v1/utils/error";

describe("unit edit service", () => {
	const validName = "test unit";
	const validId = v4();
	const validCompanyId = v4();
	const validCompanyName = "test company";
	const validDescription = "test description";

	describe("Successful", () => {
		it("should return a status code 204 with no content, with all params supplied", async () => {
			let result: any;

			const unit = unitMock.doc({
				id: validId,
				name: validName,
				companyId: validCompanyId,
			});

			const company = companyMock.doc({
				id: validCompanyId,
				name: validCompanyName,
			});

			unitMock.repository.findOne.mockResolvedValue(unit);

			companyMock.repository.findOne.mockResolvedValue(company);

			unitMock.repository.save.mockResolvedValue(unit);

			try {
				await editUnit(
					{
						companyRepository: companyMock.repository,
						unitRepository: unitMock.repository,
					},
					{ id: validId, name: validName, companyId: validCompanyId },
				);
			} catch (err: any) {
				result = err;
			}

			expect(result).toBeUndefined();
			expect(unitMock.repository.save).toHaveBeenCalledWith(
				expect.objectContaining({
					id: validId,
					name: validName,
					companyId: validCompanyId,
				}),
			);
		});

		it("should return a status code 204 with no content, with only necessary params supplied", async () => {
			let result: any;

			const unit = unitMock.doc({
				id: validId,
				name: validName,
				companyId: validCompanyId,
			});

			const company = companyMock.doc({
				id: validCompanyId,
				name: validCompanyName,
			});

			unitMock.repository.findOne.mockResolvedValue(unit);

			companyMock.repository.findOne.mockResolvedValue(company);

			unitMock.repository.save.mockResolvedValue(unit);

			try {
				await editUnit(
					{
						companyRepository: companyMock.repository,
						unitRepository: unitMock.repository,
					},
					{ id: validId },
				);
			} catch (err: any) {
				result = err;
			}

			expect(result).toBeUndefined();
			expect(unitMock.repository.save).toHaveBeenCalledWith(
				expect.objectContaining({
					id: validId,
				}),
			);
		});
	});

	describe("Failure", () => {
		it("should throw a CustomError with a unit not found message", async () => {
			let result: any;

			unitMock.repository.findOne.mockResolvedValue(undefined);

			try {
				result = await editUnit(
					{
						unitRepository: unitMock.repository,
						companyRepository: companyMock.repository,
					},
					{ id: "invalid unit id" },
				);
			} catch (err: any) {
				result = err;
			}

			expect(result instanceof CustomError).toBeTruthy();
			expect(result.message).toBe("Unit not found");
			expect(result.statusCode).toBe(StatusCodeEnum.NOT_FOUND);
		});

		it("should throw a CustomError with a company not registered message", async () => {
			let result: any;

			const unit = unitMock.doc({
				id: validId,
				name: validName,
				companyId: validCompanyId,
			});

			unitMock.repository.findOne.mockResolvedValue(unit);

			companyMock.repository.findOne.mockResolvedValue(undefined);

			try {
				result = await editUnit(
					{
						unitRepository: unitMock.repository,
						companyRepository: companyMock.repository,
					},
					{ id: validId, companyId: "invalid company id" },
				);
			} catch (err: any) {
				result = err;
			}

			expect(result instanceof CustomError).toBeTruthy();
			expect(result.message).toBe("Company not registered");
			expect(result.statusCode).toBe(StatusCodeEnum.NOT_FOUND);
		});
	});
});
