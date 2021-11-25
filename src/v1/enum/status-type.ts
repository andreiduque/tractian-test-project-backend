export enum StatusTypeEnum {
	RUNNING = "RUNNING",
	ALERTING = "ALERTING",
	STOPPED = "STOPPED",
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const StatusTypeValues = () =>
	[...new Set(Object.values(StatusTypeEnum))] as Array<StatusTypeEnum>;
