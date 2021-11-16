import { setGlobalConnection } from "@techmmunity/symbiosis";
import { Connection } from "@techmmunity/symbiosis-mongodb";
import { CompanyEntity } from "v1/api/company/company.entity";

// eslint-disable-next-line @typescript-eslint/naming-convention
export const connect = async () => {
	// eslint-disable-next-line @typescript-eslint/naming-convention
	const connection = new Connection({
		entities: [CompanyEntity],
		databaseConfig: {
			databaseName: "Tractian-test",
			url: process.env.MONGODB_URL!,
		},
	});

	await connection.load();

	await connection.connect();

	setGlobalConnection<Connection>(connection);

	return connection;
};
