import * as express from "express";
import { connect } from "v1/config/database";
import "reflect-metadata";
import { setV1Controller } from "v1/v1.controller";
import { Connection } from "@techmmunity/symbiosis-mongodb";

const PORT = 4000;

const server = async () => {
	let connection: Connection | undefined;

	try {
		if (process.env.NODE_ENV !== "production") {
			const { config } = await import("dotenv");
			config();
		}

		const app = express();

		connection = await connect();

		setV1Controller(app);

		app.listen(PORT, process.env.HOST!);
	} catch (err: any) {
		if (connection) {
			await connection.close();
		}
	}
};

server();
