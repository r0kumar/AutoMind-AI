import type { Request, Response, NextFunction } from "express";
import { logger } from "../lib/logger";

export interface AppError extends Error {
  statusCode?: number;
  status?: string;
  isOperational?: boolean;
}

export function errorHandler(
  err: AppError,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void {
  const statusCode = err.statusCode && Number.isInteger(err.statusCode) ? err.statusCode : 500;
  const message = err.message || "Internal Server Error";

  if (statusCode >= 500) {
    logger.error({ err, statusCode }, "Unhandled server error");
  } else {
    logger.warn({ err: message, statusCode }, "Client error");
  }

  res.status(statusCode).json({
    status: "error",
    statusCode,
    message: process.env.NODE_ENV === "production" && statusCode === 500 ? "Internal Server Error" : message,
  });
}
