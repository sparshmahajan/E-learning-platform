import { Request, Response } from "express";
import { userRepo } from "../../repositories/user.repository";
import { ActionSuccessHandler } from "../../common/responses";

export const forgetPassword = async (req: Request, res: Response) => {
  const { email } = req.body as {
    email: string;
  };

  await userRepo.forgetPassword(email);

  return new ActionSuccessHandler(res, "OTP sent to email", {
    email: email,
  });
};
