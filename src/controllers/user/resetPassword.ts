import { Request, Response } from "express";
import { userRepo } from "../../repositories/user.repository";
import { ActionSuccessHandler } from "../../common/responses";

export const resetPassword = async (req: Request, res: Response) => {
  const { email, otp, password } = req.body as {
    email: string;
    otp: string;
    password: string;
  };
  const updatedUser = await userRepo.resetPassword(email, otp, password);

  return new ActionSuccessHandler(res, "Password reset successfully", {
    user: updatedUser,
  });
};
