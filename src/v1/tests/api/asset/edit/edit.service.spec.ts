import { v4 } from "uuid";
import { StatusCodeEnum } from "v1/enum/status-code";
import { StatusTypeEnum } from "v1/enum/status-type";
import { assetMock } from "v1/tests/mocks/asset";
import { unitMock } from "v1/tests/mocks/unit";
import { CustomError } from "v1/utils/error";
import * as fs from "fs";
import { editAsset } from "v1/api/asset/edit/edit.service";

describe("asset edit service", () => {
	const validId = v4();
	const validCompanyId = v4();
	const validUnitId = v4();
	const validUnitName = "test unit";
	const validImage = fs.readFileSync(
		"src/v1/tests/mocks/asset/file/testImage2.jpg",
	);
	const validImageBase64 = Buffer.from(validImage).toString("base64");
	const validName = "test asset";
	const validDescription = "test description";
	const validModel = "test model";
	const validOwner = "test owner";
	const validStatus = StatusTypeEnum.STOPPED;
	const validHealthLevel = 15;

	describe("Successful", () => {
		it("should return a status code 204 with no content, with all params supplied", async () => {
			let result: any;

			const asset = assetMock.doc({
				id: validId,
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

			assetMock.repository.findOne.mockResolvedValue(asset);

			unitMock.repository.findOne.mockResolvedValue(unit);

			assetMock.repository.save.mockResolvedValue(asset);

			try {
				await editAsset(
					{
						assetRepository: assetMock.repository,
						unitRepository: unitMock.repository,
					},
					{
						id: validId,
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
					id: validId,
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

		it("should return a status code 204 with no content, with only necessary params supplied", async () => {
			let result: any;

			const asset = assetMock.doc({
				id: validId,
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

			assetMock.repository.findOne.mockResolvedValue(asset);

			unitMock.repository.findOne.mockResolvedValue(unit);

			assetMock.repository.save.mockResolvedValue(asset);

			try {
				await editAsset(
					{
						assetRepository: assetMock.repository,
						unitRepository: unitMock.repository,
					},
					{
						id: validId,
					},
				);
			} catch (err: any) {
				result = err;
			}

			expect(result).toBeUndefined();
			expect(assetMock.repository.save).toHaveBeenCalledWith(
				expect.objectContaining({
					id: validId,
				}),
			);
		});
	});

	describe("Failure", () => {
		it("should throw a CustomError with a asset not found message", async () => {
			let result: any;

			assetMock.repository.findOne.mockResolvedValue(undefined);

			try {
				result = await editAsset(
					{
						assetRepository: assetMock.repository,
						unitRepository: unitMock.repository,
					},
					{
						id: "invalid id",
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

			expect(result instanceof CustomError).toBeTruthy();
			expect(result.message).toBe("Asset not found");
			expect(result.statusCode).toBe(StatusCodeEnum.NOT_FOUND);
		});

		it("should throw a CustomError with a unit not registered message", async () => {
			let result: any;

			const asset = assetMock.doc({
				id: validId,
				unitId: validUnitId,
				image: validImageBase64,
				name: validName,
				description: validDescription,
				model: validModel,
				owner: validOwner,
				status: validStatus,
				healthLevel: validHealthLevel,
			});

			assetMock.repository.findOne.mockResolvedValue(asset);

			unitMock.repository.findOne.mockResolvedValue(undefined);

			try {
				result = await editAsset(
					{
						assetRepository: assetMock.repository,
						unitRepository: unitMock.repository,
					},
					{
						id: validId,
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
