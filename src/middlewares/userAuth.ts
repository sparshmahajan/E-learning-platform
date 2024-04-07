import { Request, Response, NextFunction } from "express";
import { BadRequestError, NotAuthorizedError } from "../common/errors";

export const userAuth = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  if (!req.user) {
    throw new NotAuthorizedError("User not authenticated");
  }

  const { type } = req.user;
  if (type !== "user") {
    throw new BadRequestError("Only users can access this route");
  }
  next();
};
