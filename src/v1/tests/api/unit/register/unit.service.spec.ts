import { v4 } from "uuid";
import { register } from "v1/api/unit/register/register.service";
import { StatusCodeEnum } from "v1/enum/status-code";
import { companyMock } from "v1/tests/mocks/company";
import { unitMock } from "v1/tests/mocks/unit";
import { userMock } from "v1/tests/mocks/user";
import { CustomError } from "v1/utils/error";

describe("user register service", () => {
	const validCompanyName = "test company";
	const validDescription = "test description";
	const validName = "test unit";
	const validCompanyId = v4();

	describe("Sucessful", () => {
		it("should return a status code 201 with no content", async () => {
			let result: any;

			const company = companyMock.doc({
				id: validCompanyId,
				name: validCompanyName,
				description: validDescription,
			});

			const unit = unitMock.doc({
				name: validName,
				companyId: validCompanyId,
			});

			companyMock.repository.findOne.mockResolvedValue(company);

			unitMock.repository.save.mockResolvedValue(unit);

			try {
				await register(
					{
						companyRepository: companyMock.repository,
						unitRepository: unitMock.repository,
					},
					{ name: validName, companyId: validCompanyId },
				);
			} catch (err: any) {
				result = err;
			}

			expect(result).toBeUndefined();
			expect(unitMock.repository.save).toHaveBeenCalledWith(
				expect.objectContaining({
					name: validName,
					companyId: validCompanyId,
				}),
			);
		});
	});

	describe("Failure", () => {
		it("should throw a CustomError with a company not registered message", async () => {
			let result: any;

			companyMock.repository.findOne.mockResolvedValue(undefined);

			try {
				result = await register(
					{
						companyRepository: companyMock.repository,
						unitRepository: unitMock.repository,
					},
					{ name: validName, companyId: validCompanyId },
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
