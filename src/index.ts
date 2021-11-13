import Fastify from "fastify";
import { connect } from "v1/config/database";
import "reflect-metadata";
import { setV1Controller } from "v1/v1.controller";

const server = async () => {
	if (process.env.NODE_ENV !== "production") {
		const { config } = await import("dotenv");
		config();
	}

	const fastify = Fastify({
		logger: true,
	});

	await connect();

	setV1Controller(fastify);

	fastify.listen(process.env.PORT!, process.env.HOST!, err => {
		if (err) throw err;
	});
};

server();
