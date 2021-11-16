import {
	Column,
	Entity,
	getGlobalRepository,
	InsertDateColumn,
	PrimaryGeneratedColumn,
} from "@techmmunity/symbiosis";
import { Repository } from "@techmmunity/symbiosis-mongodb";
import { RepositoryKeys } from "v1/tests/mocks/repository";

@Entity("companies")
export class CompanyEntity {
	@PrimaryGeneratedColumn({
		name: "_id",
	})
	public id: string;

	@Column()
	public name: string;

	@Column()
	public description?: string;

	@InsertDateColumn()
	public createdAt: Date;
}

export type CompanyRepository = Pick<Repository<CompanyEntity>, RepositoryKeys>;

export const getCompanyRepository = () =>
	getGlobalRepository<Repository<CompanyEntity>>(CompanyEntity);
