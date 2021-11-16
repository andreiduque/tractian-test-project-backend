import { CompanyRepository } from "../company.entity";

interface HasCompanyWithSameName {
	companyRepository: CompanyRepository;
	name: string;
}

export const hasCompanyWithSameName = async ({
	companyRepository,
	name,
}: HasCompanyWithSameName) => {
	if (await companyRepository.findOne({ where: { name } })) {
		return true;
	}

	return false;
};
