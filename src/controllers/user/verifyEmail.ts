import { Request, Response } from "express";
import { userRepo } from "../../repositories/user.repository";
import { BadRequestError } from "../../common/errors";
import { ActionSuccessHandler } from "../../common/responses";

export const verifyEmail = async (req: Request, res: Response) => {
  const { email, otp } = req.body as {
    email: string;
    otp: string;
  };

  const user = await userRepo.find({ email });

  if (!user) {
    throw new BadRequestError("Invalid email");
  }

  if (user.otp !== otp) {
    throw new BadRequestError("Invalid OTP");
  }

  if (user.otpExpires < new Date()) {
    throw new BadRequestError("OTP expired");
  }

  const updatedUser = await userRepo.verify(user.id);

  return new ActionSuccessHandler(res, "Email verified successfully", {
    user: updatedUser,
  });
};
