import { v4 } from "uuid";
import { register } from "v1/api/asset/register/register.service";
import { StatusCodeEnum } from "v1/enum/status-code";
import { StatusTypeEnum } from "v1/enum/status-type";
import { assetMock } from "v1/tests/mocks/asset";
import { unitMock } from "v1/tests/mocks/unit";
import { CustomError } from "v1/utils/error";
import * as fs from "fs";

describe("asset register service", () => {
	const validCompanyId = v4();
	const validUnitId = v4();
	const validUnitName = "test unit";
	const validImage = fs.readFileSync(
		"src/v1/tests/mocks/asset/file/testImage.png",
	);
	const validImageBase64 = Buffer.from(validImage).toString("base64");
	const validName = "test asset";
	const validDescription = "test description";
	const validModel = "test model";
	const validOwner = "test owner";
	const validStatus = StatusTypeEnum.ALERTING;
	const validHealthLevel = 50;

	describe("Successful", () => {
		it("should return a status code 201 with no content, with all params supplied", async () => {
			let result: any;

			const asset = assetMock.doc({
				unitId: validUnitId,
				image: validImageBase64,
				name: validName,
				description: validDescription,
				model: validModel,
				owner: validOwner,
				status: validStatus,
				healthLevel: validHealthLevel,
			});

			const unit = unitMock.doc({
				companyId: validCompanyId,
				name: validUnitName,
			});

			unitMock.repository.findOne.mockResolvedValue(unit);

			assetMock.repository.save.mockResolvedValue(asset);

			try {
				await register(
					{
						assetRepository: assetMock.repository,
						unitRepository: unitMock.repository,
					},
					{
						unitId: validUnitId,
						image: validImage,
						name: validName,
						description: validDescription,
						model: validModel,
						owner: validOwner,
						status: validStatus,
						healthLevel: validHealthLevel,
					},
				);
			} catch (err: any) {
				result = err;
			}

			expect(result).toBeUndefined();
			expect(assetMock.repository.save).toHaveBeenCalledWith(
				expect.objectContaining({
					unitId: validUnitId,
					image: validImageBase64,
					name: validName,
					description: validDescription,
					model: validModel,
					owner: validOwner,
					status: validStatus,
					healthLevel: validHealthLevel,
				}),
			);
		});
	});

	describe("Failure", () => {
		it("should throw a CustomError with a unit not registered message", async () => {
			let result: any;

			unitMock.repository.findOne.mockResolvedValue(undefined);

			try {
				result = await register(
					{
						assetRepository: assetMock.repository,
						unitRepository: unitMock.repository,
					},
					{
						unitId: "invalid id",
						image: validImage,
						name: validName,
						description: validDescription,
						model: validModel,
						owner: validOwner,
						status: validStatus,
						healthLevel: validHealthLevel,
					},
				);
			} catch (err: any) {
				result = err;
			}

			expect(result instanceof CustomError).toBeTruthy();
			expect(result.message).toBe("Unit not registered");
			expect(result.statusCode).toBe(StatusCodeEnum.NOT_FOUND);
		});
	});
});
