import type { Request, Response, NextFunction } from "express";
import { CustomError } from "../utils/customError";

export const notFoundHandler = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  next(new CustomError(`Route ${req.originalUrl} not found`, 404));
};
