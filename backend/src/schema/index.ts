import * as zod from "zod";

/**
 * Returns server health status
 * @summary Health check
 */
export const HealthStatus = zod.object({
  status: zod.string(),
});

export const HealthCheckResponse = HealthStatus;
export type HealthStatusType = zod.infer<typeof HealthStatus>;
export * from "./types/healthStatus";
