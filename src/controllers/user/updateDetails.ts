import { Request, Response } from "express";
import { userRepo } from "../../repositories/user.repository";
import { BadRequestError } from "../../common/errors";
import { ActionSuccessHandler } from "../../common/responses";

export const updateDetails = async (req: Request, res: Response) => {
  const { name, email } = req.body as {
    name: string;
    email: string;
  };

  const { id } = req.user!;

  const user = await userRepo.find({ id });

  if (!user) {
    throw new BadRequestError("User not found");
  }

  const updatedUser = await userRepo.update(user.id, {
    name,
    email,
  });

  return new ActionSuccessHandler(res, "User details updated", {
    user: updatedUser,
  });
};
