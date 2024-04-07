import { Request, Response } from "express";
import { userRepo } from "../../repositories/user.repository";
import { BadRequestError } from "../../common/errors";
import { ActionSuccessHandler } from "../../common/responses";

export const updatePassword = async (req: Request, res: Response) => {
  const { oldPassword, newPassword } = req.body as {
    oldPassword: string;
    newPassword: string;
  };

  const { id } = req.user!;

  const user = await userRepo.find({ id });

  if (!user) {
    throw new BadRequestError("User not found");
  }

  const passwordMatch = await user.comparePassword(oldPassword);

  if (!passwordMatch) {
    throw new BadRequestError("Old password is incorrect");
  }

  const updatedUser = await userRepo.update(user.id, {
    password: newPassword,
  });

  return new ActionSuccessHandler(res, "Password updated", {
    user: updatedUser,
  });
};
