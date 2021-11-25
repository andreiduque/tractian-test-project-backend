import { UnitRepository } from "v1/api/unit/unit.entity";

interface UnitNotRegistered {
	unitRepository: UnitRepository;
	unitId: string;
}

export const unitNotRegistered = async ({
	unitRepository,
	unitId,
}: UnitNotRegistered) => {
	if (!(await unitRepository.findOne({ where: { id: unitId } }))) {
		return true;
	}

	return false;
};
