import { StatusCodeEnum } from "v1/enum/status-code";
import { StatusTypeEnum } from "v1/enum/status-type";
import { CustomError } from "v1/utils/error";
import * as fs from "fs";
import { validation } from "v1/api/asset/register/register.validation";
import { RegisterParams } from "v1/api/asset/register/register.service";
import { v4 } from "uuid";

describe("company register validation", () => {
	const validUnitId = v4();
	const validImage = {
		buffer: fs.readFileSync("src/v1/tests/mocks/asset/file/testImage.png"),
		mimetype: "image/png",
	} as any;
	const validName = "test asset";
	const validDescription = "test description";
	const validModel = "test model";
	const validOwner = "test owner";
	const validStatus = StatusTypeEnum.ALERTING;
	const validHealthLevel = 50;

	describe("Successful", () => {
		it("should return validated params", async () => {
			let result: any;

			try {
				result = await validation({
					unitId: validUnitId,
					image: validImage,
					name: validName,
					description: validDescription,
					model: validModel,
					owner: validOwner,
					status: validStatus,
					healthLevel: validHealthLevel,
				});
			} catch (err: any) {
				result = err;
			}

			expect(result).toStrictEqual({
				unitId: validUnitId,
				image: validImage,
				name: validName,
				description: validDescription,
				model: validModel,
				owner: validOwner,
				status: validStatus,
				healthLevel: validHealthLevel,
			});
		});
	});

	// eslint-disable-next-line sonarjs/cognitive-complexity
	describe("Invalid params", () => {
		it("should throw a CustomError with invalid image param message", async () => {
			let result: any;

			try {
				result = await validation({
					unitId: validUnitId,
					image: {
						buffer: fs.readFileSync(
							"src/v1/tests/mocks/asset/file/invalidFile.txt",
						),
						mimetype: "text/.txt",
					} as any,
					name: validName,
					description: validDescription,
					model: validModel,
					owner: validOwner,
					status: validStatus,
					healthLevel: validHealthLevel,
				});
			} catch (err: any) {
				result = err;
			}

			expect(result instanceof CustomError).toBeTruthy();
			expect(result.message).toBe(
				"Unsupported file format, file must be: .jpg, .jpeg, .png or .bmp",
			);
			expect(result.statusCode).toBe(StatusCodeEnum.BAD_REQUEST);
		});

		it("should throw a CustomError with invalid name, too short, param message", async () => {
			let result: any;

			try {
				result = await validation({
					unitId: validUnitId,
					image: validImage,
					name: "a",
					description: validDescription,
					model: validModel,
					owner: validOwner,
					status: validStatus,
					healthLevel: validHealthLevel,
				});
			} catch (err: any) {
				result = err;
			}

			expect(result instanceof CustomError).toBeTruthy();
			expect(result.message).toBe("name must be at least 3 characters");
			expect(result.statusCode).toBe(StatusCodeEnum.BAD_REQUEST);
		});

		it("should throw a CustomError with invalid name, too long, param message", async () => {
			let result: any;

			try {
				result = await validation({
					unitId: validUnitId,
					image: validImage,
					name: "a".repeat(201),
					description: validDescription,
					model: validModel,
					owner: validOwner,
					status: validStatus,
					healthLevel: validHealthLevel,
				});
			} catch (err: any) {
				result = err;
			}

			expect(result instanceof CustomError).toBeTruthy();
			expect(result.message).toBe("name must be at most 200 characters");
			expect(result.statusCode).toBe(StatusCodeEnum.BAD_REQUEST);
		});

		it("should throw a CustomError with invalid description, too long, param message", async () => {
			let result: any;

			try {
				result = await validation({
					unitId: validUnitId,
					image: validImage,
					name: validName,
					description: "a".repeat(5001),
					model: validModel,
					owner: validOwner,
					status: validStatus,
					healthLevel: validHealthLevel,
				});
			} catch (err: any) {
				result = err;
			}

			expect(result instanceof CustomError).toBeTruthy();
			expect(result.message).toBe(
				"description must be at most 5000 characters",
			);
			expect(result.statusCode).toBe(StatusCodeEnum.BAD_REQUEST);
		});

		it("should throw a CustomError with invalid model, too short, param message", async () => {
			let result: any;

			try {
				result = await validation({
					unitId: validUnitId,
					image: validImage,
					name: validName,
					description: validDescription,
					model: "a",
					owner: validOwner,
					status: validStatus,
					healthLevel: validHealthLevel,
				});
			} catch (err: any) {
				result = err;
			}

			expect(result instanceof CustomError).toBeTruthy();
			expect(result.message).toBe("model must be at least 3 characters");
			expect(result.statusCode).toBe(StatusCodeEnum.BAD_REQUEST);
		});

		it("should throw a CustomError with invalid model, too long, param message", async () => {
			let result: any;

			try {
				result = await validation({
					unitId: validUnitId,
					image: validImage,
					name: validName,
					description: validDescription,
					model: "a".repeat(201),
					owner: validOwner,
					status: validStatus,
					healthLevel: validHealthLevel,
				});
			} catch (err: any) {
				result = err;
			}

			expect(result instanceof CustomError).toBeTruthy();
			expect(result.message).toBe("model must be at most 200 characters");
			expect(result.statusCode).toBe(StatusCodeEnum.BAD_REQUEST);
		});

		it("should throw a CustomError with invalid owner, too short, param message", async () => {
			let result: any;

			try {
				result = await validation({
					unitId: validUnitId,
					image: validImage,
					name: validName,
					description: validDescription,
					model: validModel,
					owner: "a",
					status: validStatus,
					healthLevel: validHealthLevel,
				});
			} catch (err: any) {
				result = err;
			}

			expect(result instanceof CustomError).toBeTruthy();
			expect(result.message).toBe("owner must be at least 3 characters");
			expect(result.statusCode).toBe(StatusCodeEnum.BAD_REQUEST);
		});

		it("should throw a CustomError with invalid owner, too long, param message", async () => {
			let result: any;

			try {
				result = await validation({
					unitId: validUnitId,
					image: validImage,
					name: validName,
					description: validDescription,
					model: validModel,
					owner: "a".repeat(201),
					status: validStatus,
					healthLevel: validHealthLevel,
				});
			} catch (err: any) {
				result = err;
			}

			expect(result instanceof CustomError).toBeTruthy();
			expect(result.message).toBe("owner must be at most 200 characters");
			expect(result.statusCode).toBe(StatusCodeEnum.BAD_REQUEST);
		});

		it("should throw a CustomError with invalid healthLevel, too small, param message", async () => {
			let result: any;

			try {
				result = await validation({
					unitId: validUnitId,
					image: validImage,
					name: validName,
					description: validDescription,
					model: validModel,
					owner: validOwner,
					status: validStatus,
					healthLevel: -2,
				});
			} catch (err: any) {
				result = err;
			}

			expect(result instanceof CustomError).toBeTruthy();
			expect(result.message).toBe(
				"healthLevel must be greater than or equal to 0",
			);
			expect(result.statusCode).toBe(StatusCodeEnum.BAD_REQUEST);
		});

		it("should throw a CustomError with invalid healthLevel, too big, param message", async () => {
			let result: any;

			try {
				result = await validation({
					unitId: validUnitId,
					image: validImage,
					name: validName,
					description: validDescription,
					model: validModel,
					owner: validOwner,
					status: validStatus,
					healthLevel: 101,
				});
			} catch (err: any) {
				result = err;
			}

			expect(result instanceof CustomError).toBeTruthy();
			expect(result.message).toBe(
				"healthLevel must be less than or equal to 100",
			);
			expect(result.statusCode).toBe(StatusCodeEnum.BAD_REQUEST);
		});
	});

	// eslint-disable-next-line sonarjs/cognitive-complexity
	describe("Undefined params", () => {
		it("should throw a CustomError with undefined unitId param message", async () => {
			let result: any;

			try {
				result = await validation({
					image: validImage,
					name: validName,
					description: validDescription,
					model: validModel,
					owner: validOwner,
					status: validStatus,
					healthLevel: validHealthLevel,
				} as RegisterParams);
			} catch (err: any) {
				result = err;
			}

			expect(result instanceof CustomError).toBeTruthy();
			expect(result.message).toBe("unitId is a required field");
			expect(result.statusCode).toBe(StatusCodeEnum.BAD_REQUEST);
		});

		it("should throw a CustomError with undefined image param message", async () => {
			let result: any;

			try {
				result = await validation({
					unitId: validUnitId,
					name: validName,
					description: validDescription,
					model: validModel,
					owner: validOwner,
					status: validStatus,
					healthLevel: validHealthLevel,
				} as RegisterParams);
			} catch (err: any) {
				result = err;
			}

			expect(result instanceof CustomError).toBeTruthy();
			expect(result.message).toBe("image is a required field");
			expect(result.statusCode).toBe(StatusCodeEnum.BAD_REQUEST);
		});

		it("should throw a CustomError with undefined name param message", async () => {
			let result: any;

			try {
				result = await validation({
					unitId: validUnitId,
					image: validImage,
					description: validDescription,
					model: validModel,
					owner: validOwner,
					status: validStatus,
					healthLevel: validHealthLevel,
				} as RegisterParams);
			} catch (err: any) {
				result = err;
			}

			expect(result instanceof CustomError).toBeTruthy();
			expect(result.message).toBe("name is a required field");
			expect(result.statusCode).toBe(StatusCodeEnum.BAD_REQUEST);
		});

		it("should throw a CustomError with undefined description param message", async () => {
			let result: any;

			try {
				result = await validation({
					unitId: validUnitId,
					image: validImage,
					name: validName,
					model: validModel,
					owner: validOwner,
					status: validStatus,
					healthLevel: validHealthLevel,
				} as RegisterParams);
			} catch (err: any) {
				result = err;
			}

			expect(result instanceof CustomError).toBeTruthy();
			expect(result.message).toBe("description is a required field");
			expect(result.statusCode).toBe(StatusCodeEnum.BAD_REQUEST);
		});

		it("should throw a CustomError with undefined model param message", async () => {
			let result: any;

			try {
				result = await validation({
					unitId: validUnitId,
					image: validImage,
					name: validName,
					description: validDescription,
					owner: validOwner,
					status: validStatus,
					healthLevel: validHealthLevel,
				} as RegisterParams);
			} catch (err: any) {
				result = err;
			}

			expect(result instanceof CustomError).toBeTruthy();
			expect(result.message).toBe("model is a required field");
			expect(result.statusCode).toBe(StatusCodeEnum.BAD_REQUEST);
		});

		it("should throw a CustomError with undefined owner param message", async () => {
			let result: any;

			try {
				result = await validation({
					unitId: validUnitId,
					image: validImage,
					name: validName,
					description: validDescription,
					model: validModel,
					status: validStatus,
					healthLevel: validHealthLevel,
				} as RegisterParams);
			} catch (err: any) {
				result = err;
			}

			expect(result instanceof CustomError).toBeTruthy();
			expect(result.message).toBe("owner is a required field");
			expect(result.statusCode).toBe(StatusCodeEnum.BAD_REQUEST);
		});

		it("should throw a CustomError with undefined status param message", async () => {
			let result: any;

			try {
				result = await validation({
					unitId: validUnitId,
					image: validImage,
					name: validName,
					description: validDescription,
					model: validModel,
					owner: validOwner,
					healthLevel: validHealthLevel,
				} as RegisterParams);
			} catch (err: any) {
				result = err;
			}

			expect(result instanceof CustomError).toBeTruthy();
			expect(result.message).toBe("status is a required field");
			expect(result.statusCode).toBe(StatusCodeEnum.BAD_REQUEST);
		});

		it("should throw a CustomError with undefined healthLevel param message", async () => {
			let result: any;

			try {
				result = await validation({
					unitId: validUnitId,
					image: validImage,
					name: validName,
					description: validDescription,
					model: validModel,
					owner: validOwner,
					status: validStatus,
				} as RegisterParams);
			} catch (err: any) {
				result = err;
			}

			expect(result instanceof CustomError).toBeTruthy();
			expect(result.message).toBe("healthLevel is a required field");
			expect(result.statusCode).toBe(StatusCodeEnum.BAD_REQUEST);
		});
	});

	// eslint-disable-next-line sonarjs/cognitive-complexity
	describe("Invalid type", () => {
		it("should throw a CustomError with a invalid unitId type param message", async () => {
			let result: any;

			try {
				result = await validation({
					unitId: 42 as any,
					image: validImage,
					name: validName,
					description: validDescription,
					model: validModel,
					owner: validOwner,
					status: validStatus,
					healthLevel: validHealthLevel,
				});
			} catch (err: any) {
				result = err;
			}

			expect(result instanceof CustomError).toBeTruthy();
			expect(result.message).toBe(
				"unitId must be a `string` type, but the final value was: `42`.",
			);
			expect(result.statusCode).toBe(StatusCodeEnum.BAD_REQUEST);
		});

		it("should throw a CustomError with a invalid name type param message", async () => {
			let result: any;

			try {
				result = await validation({
					unitId: validUnitId,
					image: validImage,
					name: 42 as any,
					description: validDescription,
					model: validModel,
					owner: validOwner,
					status: validStatus,
					healthLevel: validHealthLevel,
				});
			} catch (err: any) {
				result = err;
			}

			expect(result instanceof CustomError).toBeTruthy();
			expect(result.message).toBe(
				"name must be a `string` type, but the final value was: `42`.",
			);
			expect(result.statusCode).toBe(StatusCodeEnum.BAD_REQUEST);
		});

		it("should throw a CustomError with a invalid description type param message", async () => {
			let result: any;

			try {
				result = await validation({
					unitId: validUnitId,
					image: validImage,
					name: validName,
					description: 42 as any,
					model: validModel,
					owner: validOwner,
					status: validStatus,
					healthLevel: validHealthLevel,
				});
			} catch (err: any) {
				result = err;
			}

			expect(result instanceof CustomError).toBeTruthy();
			expect(result.message).toBe(
				"description must be a `string` type, but the final value was: `42`.",
			);
			expect(result.statusCode).toBe(StatusCodeEnum.BAD_REQUEST);
		});

		it("should throw a CustomError with a invalid model type param message", async () => {
			let result: any;

			try {
				result = await validation({
					unitId: validUnitId,
					image: validImage,
					name: validName,
					description: validDescription,
					model: 42 as any,
					owner: validOwner,
					status: validStatus,
					healthLevel: validHealthLevel,
				});
			} catch (err: any) {
				result = err;
			}

			expect(result instanceof CustomError).toBeTruthy();
			expect(result.message).toBe(
				"model must be a `string` type, but the final value was: `42`.",
			);
			expect(result.statusCode).toBe(StatusCodeEnum.BAD_REQUEST);
		});

		it("should throw a CustomError with a invalid owner type param message", async () => {
			let result: any;

			try {
				result = await validation({
					unitId: validUnitId,
					image: validImage,
					name: validName,
					description: validDescription,
					model: validModel,
					owner: 42 as any,
					status: validStatus,
					healthLevel: validHealthLevel,
				});
			} catch (err: any) {
				result = err;
			}

			expect(result instanceof CustomError).toBeTruthy();
			expect(result.message).toBe(
				"owner must be a `string` type, but the final value was: `42`.",
			);
			expect(result.statusCode).toBe(StatusCodeEnum.BAD_REQUEST);
		});

		it("should throw a CustomError with a invalid status type param message", async () => {
			let result: any;

			try {
				result = await validation({
					unitId: validUnitId,
					image: validImage,
					name: validName,
					description: validDescription,
					model: validModel,
					owner: validOwner,
					status: 42 as any,
					healthLevel: validHealthLevel,
				});
			} catch (err: any) {
				result = err;
			}

			expect(result instanceof CustomError).toBeTruthy();
			expect(result.message).toBe(
				"status must be a `string` type, but the final value was: `42`.",
			);
			expect(result.statusCode).toBe(StatusCodeEnum.BAD_REQUEST);
		});

		it("should throw a CustomError with a invalid healthLevel type param message", async () => {
			let result: any;

			try {
				result = await validation({
					unitId: validUnitId,
					image: validImage,
					name: validName,
					description: validDescription,
					model: validModel,
					owner: validOwner,
					status: validStatus,
					healthLevel: {} as any,
				});
			} catch (err: any) {
				result = err;
			}

			expect(result instanceof CustomError).toBeTruthy();
			expect(result.message).toBe(
				"healthLevel must be a `number` type, but the final value was: `{}`.",
			);
			expect(result.statusCode).toBe(StatusCodeEnum.BAD_REQUEST);
		});
	});
});
