import { CompanyRepository } from "v1/api/company/company.entity";

interface CompanyNotRegistered {
	companyRepository: CompanyRepository;
	companyId: string;
}

export const companyNotRegistered = async ({
	companyRepository,
	companyId,
}: CompanyNotRegistered) => {
	if (!(await companyRepository.findOne({ where: { id: companyId } }))) {
		return true;
	}

	return false;
};
