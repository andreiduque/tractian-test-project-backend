import { v4 } from "uuid";
import { deleteCompany } from "v1/api/company/delete/delete.service";
import { StatusCodeEnum } from "v1/enum/status-code";
import { companyMock } from "v1/tests/mocks/company";
import { CustomError } from "v1/utils/error";

describe("delete company service", () => {
	const validId = v4();
	const validName = "test name";

	describe("Successful", () => {
		it("should return a status code 204 with no content", async () => {
			let result: any;

			const company = companyMock.doc({
				id: validId,
				name: validName,
			});

			companyMock.repository.findOne.mockResolvedValue(company);

			companyMock.repository.delete.mockResolvedValue(company);

			try {
				result = await deleteCompany(
					{ companyRepository: companyMock.repository },
					{ id: validId },
				);
			} catch (err: any) {
				result = err;
			}

			expect(result).toBeUndefined();
			expect(companyMock.repository.delete).toHaveBeenCalledWith({
				id: validId,
			});
		});
	});

	describe("Failure", () => {
		it("should throw a CustomError with a company not registered message", async () => {
			let result: any;

			companyMock.repository.findOne(undefined);

			try {
				result = await deleteCompany(
					{ companyRepository: companyMock.repository },
					{ id: validId },
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
