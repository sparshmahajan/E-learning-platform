import { Request, Response } from "express";
import { adminRepo } from "../../repositories/admin.repository";
import { BadRequestError } from "../../common/errors";
import { ActionSuccessHandler } from "../../common/responses";

export const verifyEmail = async (req: Request, res: Response) => {
  const { email, otp } = req.body as {
    email: string;
    otp: string;
  };

  const admin = await adminRepo.find({ email });

  if (!admin) {
    throw new BadRequestError("Invalid email");
  }

  if (admin.otp !== otp) {
    throw new BadRequestError("Invalid OTP");
  }

  if (admin.otpExpires < new Date()) {
    throw new BadRequestError("OTP expired");
  }

  const updatedAdmin = await adminRepo.verify(admin.id);

  return new ActionSuccessHandler(res, "Email verified successfully", {
    admin: updatedAdmin,
  });
};
