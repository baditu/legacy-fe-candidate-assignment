import type { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { CustomError } from "../utils/customError";

export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  let statusCode = 500;
  let message = "Internal Server Error";
  let errors: any = undefined;

  if (error instanceof CustomError) {
    statusCode = error.statusCode;
    message = error.message;
  }

  if (error instanceof ZodError) {
    statusCode = 400;
    message = "Validation Error";

    errors = error.issues.map((err) => ({
      field: err.path.join("."),
      message: err.message,
    }));
  }

  res.status(statusCode).json({
    success: false,
    message,
    ...(errors && { errors }),
  });
};
