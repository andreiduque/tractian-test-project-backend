import {
	Column,
	Entity,
	getGlobalRepository,
	InsertDateColumn,
	PrimaryGeneratedColumn,
} from "@techmmunity/symbiosis";
import { Repository } from "@techmmunity/symbiosis-mongodb";
import { RepositoryKeys } from "v1/tests/mocks/repository";

@Entity("units")
export class UnitEntity {
	@PrimaryGeneratedColumn({
		name: "_id",
	})
	public id: string;

	@Column()
	public companyId: string;

	@Column()
	public name: string;

	@Column()
	public description?: string;

	@InsertDateColumn()
	public createdAt: string;
}

export type UnitRepository = Pick<Repository<UnitEntity>, RepositoryKeys>;

export const getUnitRepository = () =>
	getGlobalRepository<Repository<UnitEntity>>(UnitEntity);
