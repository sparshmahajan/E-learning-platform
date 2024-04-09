import { Request, Response, NextFunction } from "express";
import { BadRequestError, NotAuthorizedError } from "../common/errors";
import { decodeToken } from "../security/jwt";

interface UserPayload {
  id: number;
  email: string;
  type: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: UserPayload;
    }
  }
}

export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.session?.jwt;
  if (!token) {
    throw new NotAuthorizedError();
  }

  const decoded = decodeToken(token) as UserPayload;
  req.user = decoded;
  next();
};
