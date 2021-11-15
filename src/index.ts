import * as express from "express";
import { connect } from "v1/config/database";
import "reflect-metadata";
import { setV1Controller } from "v1/v1.controller";

const PORT = 4000;

const server = async () => {
	if (process.env.NODE_ENV !== "production") {
		const { config } = await import("dotenv");
		config();
	}

	const index = express();

	await connect();

	setV1Controller(index);

	index.listen(PORT, process.env.HOST!);
};

server();
