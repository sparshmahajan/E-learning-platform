import { Request, Response } from "express";
import { adminRepo } from "../../repositories/admin.repository";
import { ActionSuccessHandler } from "../../common/responses";

export const resetPassword = async (req: Request, res: Response) => {
  const { email, otp, password } = req.body as {
    email: string;
    otp: string;
    password: string;
  };
  const updatedAdmin = await adminRepo.resetPassword(email, otp, password);

  return new ActionSuccessHandler(res, "Password reset successfully", {
    admin: updatedAdmin,
  });
};
