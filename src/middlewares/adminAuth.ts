import { Request, Response, NextFunction } from "express";
import { BadRequestError, NotAuthorizedError } from "../common/errors";

export const adminAuth = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  if (!req.user) {
    throw new NotAuthorizedError("User not authenticated");
  }

  const { type } = req.user;
  if (type !== "admin") {
    throw new BadRequestError("Only admins can access this route");
  }
  next();
};
