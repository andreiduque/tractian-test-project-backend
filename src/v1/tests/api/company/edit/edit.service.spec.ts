import { v4 } from "uuid";
import { editCompany } from "v1/api/company/edit/edit.service";
import { StatusCodeEnum } from "v1/enum/status-code";
import { companyMock } from "v1/tests/mocks/company";
import { CustomError } from "v1/utils/error";

describe("company edit service", () => {
	const validName = "test company";
	const validDescription = "test description";
	const validId = v4();

	describe("Successful", () => {
		it("should return a status code 204 with no content, with all params supplied", async () => {
			let result: any;

			const company = companyMock.doc({
				id: validId,
				name: validName,
				description: validDescription,
			});

			companyMock.repository.findOne.mockResolvedValue(company);

			companyMock.repository.save.mockResolvedValue(company);

			try {
				await editCompany(
					{ companyRepository: companyMock.repository },
					{ id: validId, name: validName, description: validDescription },
				);
			} catch (err: any) {
				result = err;
			}

			expect(result).toBeUndefined();
			expect(companyMock.repository.save).toHaveBeenCalledWith(
				expect.objectContaining({
					id: validId,
					name: validName,
					description: validDescription,
				}),
			);
		});

		it("should return a status code 204 with no content, with only necessary params supplied", async () => {
			let result: any;

			const company = companyMock.doc({
				id: validId,
				name: validName,
				description: validDescription,
			});

			companyMock.repository.findOne.mockResolvedValue(company);

			companyMock.repository.save.mockResolvedValue(company);

			try {
				await editCompany(
					{ companyRepository: companyMock.repository },
					{ id: validId },
				);
			} catch (err: any) {
				result = err;
			}

			expect(result).toBeUndefined();
			expect(companyMock.repository.save).toHaveBeenCalledWith(
				expect.objectContaining({
					id: validId,
				}),
			);
		});
	});

	describe("Failure", () => {
		it("should throw a CustomError with a company not found message", async () => {
			let result: any;

			companyMock.repository.findOne.mockResolvedValue(undefined);

			try {
				result = await editCompany(
					{ companyRepository: companyMock.repository },
					{ id: validId },
				);
			} catch (err: any) {
				result = err;
			}

			expect(result instanceof CustomError).toBeTruthy();
			expect(result.message).toBe("Company not found");
			expect(result.statusCode).toBe(StatusCodeEnum.NOT_FOUND);
		});
	});
});
