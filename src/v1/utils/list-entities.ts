const DEFAULT = 1;
export const ENTITIES_PER_PAGE = 10;

export const paginateEntities = (page?: number) => {
	// Remove 1 from the index of the page to start at 0.
	// eslint-disable-next-line @typescript-eslint/no-magic-numbers
	const pageWithRightIndex = (page || DEFAULT) - 1;

	const entitiesToSkip = pageWithRightIndex * ENTITIES_PER_PAGE;

	return entitiesToSkip;
};
