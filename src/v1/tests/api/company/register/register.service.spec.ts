import { register } from "v1/api/company/register/register.service";
import { StatusCodeEnum } from "v1/enum/status-code";
import { companyMock } from "v1/tests/mocks/company";
import { CustomError } from "v1/utils/error";

describe("company register service", () => {
	const validName = "test company";
	const validDescription = "test description";

	describe("Sucessful", () => {
		it("should return a status code 201 with no content, with all params supplied", async () => {
			let result: any;

			const company = companyMock.doc({
				name: validName,
				description: validDescription,
			});

			companyMock.repository.save.mockResolvedValue(company);

			try {
				await register(
					{ companyRepository: companyMock.repository },
					{ name: validName, description: validDescription },
				);
			} catch (err: any) {
				result = err;
			}

			expect(result).toBeUndefined();
			expect(companyMock.repository.save).toHaveBeenCalledWith(
				expect.objectContaining({
					name: validName,
					description: validDescription,
				}),
			);
		});

		it("should return a status code 201 with no content, with only necessary params supplied", async () => {
			let result: any;

			const company = companyMock.doc({
				name: validName,
			});

			companyMock.repository.save.mockResolvedValue(company);

			try {
				await register(
					{ companyRepository: companyMock.repository },
					{ name: validName, description: validDescription },
				);
			} catch (err: any) {
				result = err;
			}

			expect(result).toBeUndefined();
			expect(companyMock.repository.save).toHaveBeenCalledWith(
				expect.objectContaining({
					name: validName,
				}),
			);
		});
	});

	describe("Failure", () => {
		it("should throw a CustomError with a company name already registered message", async () => {
			let result: any;

			const company = companyMock.doc({
				name: validName,
				description: validDescription,
			});

			companyMock.repository.findOne.mockResolvedValue(company);

			try {
				result = await register(
					{ companyRepository: companyMock.repository },
					{ name: validName },
				);
			} catch (err: any) {
				result = err;
			}

			expect(result instanceof CustomError).toBeTruthy();
			expect(result.message).toBe("Company with same name already registered");
			expect(result.statusCode).toBe(StatusCodeEnum.CONFLICT);
		});
	});
});
