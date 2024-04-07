import { Request, Response } from "express";
import { adminRepo } from "../../repositories/admin.repository";
import { ActionSuccessHandler } from "../../common/responses";

export const forgetPassword = async (req: Request, res: Response) => {
  const { email } = req.body as {
    email: string;
  };

  await adminRepo.forgetPassword(email);

  return new ActionSuccessHandler(res, "OTP sent to email", {
    email: email,
  });
};
