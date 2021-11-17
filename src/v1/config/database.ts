import { setGlobalConnection } from "@techmmunity/symbiosis";
import { Connection } from "@techmmunity/symbiosis-mongodb";
import { CompanyEntity } from "v1/api/company/company.entity";
import { UnitEntity } from "v1/api/unit/unit.entity";
import { UserEntity } from "v1/api/user/user.entity";

// eslint-disable-next-line @typescript-eslint/naming-convention
export const connect = async () => {
	// eslint-disable-next-line @typescript-eslint/naming-convention
	const connection = new Connection({
		entities: [CompanyEntity, UserEntity, UnitEntity],
		databaseConfig: {
			databaseName: "Tractian-test",
			url: process.env.MONGODB_URL!,
		},
		logging: "ALL_INTERNAL",
	});

	await connection.load();

	await connection.connect();

	setGlobalConnection<Connection>(connection);

	return connection;
};
