import { v4 } from "uuid";
import { StatusCodeEnum } from "v1/enum/status-code";
import { StatusTypeEnum } from "v1/enum/status-type";
import { assetMock } from "v1/tests/mocks/asset";
import { CustomError } from "v1/utils/error";
import * as fs from "fs";
import { listByPage } from "v1/api/asset/list-by-page/list-by-page.service";

describe("asset listByPage service", () => {
	const validPage = 1;
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

	let asset: any;

	beforeAll(() => {
		asset = assetMock.doc({
			unitId: validUnitId,
			image: validImageBase64,
			name: validName,
			description: validDescription,
			model: validModel,
			owner: validOwner,
			status: validStatus,
			healthLevel: validHealthLevel,
		});
	});

	describe("Successful", () => {
		it("should return an array of assets", async () => {
			let result: any;

			assetMock.repository.find.mockResolvedValue([asset]);

			try {
				result = await listByPage(
					{
						assetRepository: assetMock.repository,
					},
					{
						page: validPage,
						unitId: validUnitId,
					},
				);
			} catch (err: any) {
				result = err;
			}

			expect(result).toStrictEqual([asset]);
		});

		it("should return the array of assets from the first page", async () => {
			let result: any;

			assetMock.repository.find.mockResolvedValue([asset]);

			try {
				result = await listByPage(
					{
						assetRepository: assetMock.repository,
					},
					{ unitId: validUnitId },
				);
			} catch (err: any) {
				result = err;
			}

			expect(result).toStrictEqual([asset]);
		});
	});

	describe("Failure", () => {
		it("should throw a CustomError with a No asset found for this page message", async () => {
			let result: any;

			assetMock.repository.find.mockResolvedValue([]);

			try {
				result = await listByPage(
					{
						assetRepository: assetMock.repository,
					},
					{
						page: 2,
						unitId: validUnitId,
					},
				);
			} catch (err: any) {
				result = err;
			}

			expect(result instanceof CustomError).toBeTruthy();
			expect(result.message).toBe("No asset found for this page");
			expect(result.statusCode).toBe(StatusCodeEnum.NOT_FOUND);
		});

		it("should throw a CustomError with a No asset found for this page message, because of invalid unitId", async () => {
			let result: any;

			assetMock.repository.find.mockResolvedValue([]);

			try {
				result = await listByPage(
					{
						assetRepository: assetMock.repository,
					},
					{
						page: 2,
						unitId: "123456789",
					},
				);
			} catch (err: any) {
				result = err;
			}

			expect(result instanceof CustomError).toBeTruthy();
			expect(result.message).toBe("No asset found for this page");
			expect(result.statusCode).toBe(StatusCodeEnum.NOT_FOUND);
		});
	});
});
