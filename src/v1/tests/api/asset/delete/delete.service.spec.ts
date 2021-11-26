import { v4 } from "uuid";
import * as fs from "fs";
import { StatusTypeEnum } from "v1/enum/status-type";
import { assetMock } from "v1/tests/mocks/asset";
import { deleteAsset } from "v1/api/asset/delete/delete.service";

describe("delete asset service", () => {
	const validId = v4();
	const validUnitId = v4();
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
		it("should return a status code 204 with no content, with id supplied", async () => {
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

			assetMock.repository.delete.mockResolvedValue(asset);

			try {
				result = await deleteAsset(
					{ assetRepository: assetMock.repository },
					{ id: validId },
				);
			} catch (err: any) {
				result = err;
			}

			expect(result).toBeUndefined();
			expect(assetMock.repository.delete).toHaveBeenCalledWith([
				{
					id: validId,
				},
				{
					unitId: undefined,
				},
			]);
		});

		it("should return a status code 204 with no content, with unitId supplied", async () => {
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

			assetMock.repository.delete.mockResolvedValue(asset);

			try {
				result = await deleteAsset(
					{ assetRepository: assetMock.repository },
					{ unitId: validUnitId },
				);
			} catch (err: any) {
				result = err;
			}

			expect(result).toBeUndefined();
			expect(assetMock.repository.delete).toHaveBeenCalledWith([
				{
					id: undefined,
				},
				{
					unitId: validUnitId,
				},
			]);
		});
	});
});
