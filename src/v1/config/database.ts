import { createConnection } from "typeorm";
import { ExampleEntity } from "v1/api/example/example.entity";

// eslint-disable-next-line @typescript-eslint/naming-convention
export const connect = () =>
	createConnection({
		type: "mongodb" as any,
		url: process.env.MONGODB_URL,
		synchronize: false,
		logging: process.env.NODE_ENV !== "production",
		entities: [ExampleEntity],
	});
