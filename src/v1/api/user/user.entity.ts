import {
	Column,
	Entity,
	getGlobalRepository,
	InsertDateColumn,
	PrimaryGeneratedColumn,
} from "@techmmunity/symbiosis";
import { Repository } from "@techmmunity/symbiosis-mongodb";
import { RepositoryKeys } from "v1/tests/mocks/repository";

@Entity("users")
export class UserEntity {
	@PrimaryGeneratedColumn({
		name: "_id",
	})
	public id: string;

	@Column()
	public companyId: string;

	@Column()
	public name: string;

	@InsertDateColumn()
	public createdAt: string;
}

export type UserRepository = Pick<Repository<UserEntity>, RepositoryKeys>;

export const getUserRepository = () =>
	getGlobalRepository<Repository<UserEntity>>(UserEntity);
