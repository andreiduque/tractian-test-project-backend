import {
	Column,
	Entity,
	getGlobalRepository,
	InsertDateColumn,
	PrimaryGeneratedColumn,
} from "@techmmunity/symbiosis";
import { Repository } from "@techmmunity/symbiosis-mongodb";
import { StatusTypeEnum } from "v1/enum/status-type";
import { RepositoryKeys } from "v1/tests/mocks/repository";

@Entity("assets")
export class AssetEntity {
	@PrimaryGeneratedColumn({
		name: "_id",
	})
	public id: string;

	@Column()
	public unitId: string;

	@Column()
	public image: string;

	@Column()
	public name: string;

	@Column()
	public description: string;

	@Column()
	public model: string;

	@Column()
	public owner: string;

	@Column()
	public status: StatusTypeEnum;

	@Column()
	public healthLevel: number;

	@InsertDateColumn()
	public createdAt: string;
}

export type AssetRepository = Pick<Repository<AssetEntity>, RepositoryKeys>;

export const getAssetRepository = () =>
	getGlobalRepository<Repository<AssetEntity>>(AssetEntity);
