import { Request, Response } from "express";
import { userRepo } from "../../repositories/user.repository";
import { BadRequestError } from "../../common/errors";
import { ActionSuccessHandler } from "../../common/responses";

export const getUser = async (req: Request, res: Response) => {
  const { id } = req.user!;

  const user = await userRepo.find({ id });

  if (!user) {
    throw new BadRequestError("User not found");
  }

  return new ActionSuccessHandler(res, "User found", { user: user.toJSON() });
};
