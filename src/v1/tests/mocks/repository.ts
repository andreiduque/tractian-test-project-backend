export interface MockRepository {
	find: jest.Mock;
	findOne: jest.Mock;
	save: jest.Mock;
	insert: jest.Mock;
	update: jest.Mock;
	delete: jest.Mock;
	count: jest.Mock;
	recover: jest.Mock;
	softDelete: jest.Mock;
	performativeCount: jest.Mock;
}

export type RepositoryKeys = keyof MockRepository;

export const makeMockRepository = (): MockRepository => ({
	find: jest.fn(),
	findOne: jest.fn(),
	save: jest.fn(),
	insert: jest.fn(),
	update: jest.fn(),
	delete: jest.fn(),
	count: jest.fn(),
	recover: jest.fn(),
	softDelete: jest.fn(),
	performativeCount: jest.fn(),
});
