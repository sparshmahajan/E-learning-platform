import { Request, Response } from "express";
import { adminRepo } from "../../repositories/admin.repository";
import { BadRequestError } from "../../common/errors";
import { ActionSuccessHandler } from "../../common/responses";

export const updatePassword = async (req: Request, res: Response) => {
  const { oldPassword, newPassword } = req.body as {
    oldPassword: string;
    newPassword: string;
  };

  const { id } = req.user!;

  const admin = await adminRepo.find({ id });

  if (!admin) {
    throw new BadRequestError("Admin not found");
  }

  const passwordMatch = await admin.comparePassword(oldPassword);

  if (!passwordMatch) {
    throw new BadRequestError("Old password is incorrect");
  }

  const updatedAdmin = await adminRepo.update(admin.id, {
    password: newPassword,
  });

  return new ActionSuccessHandler(res, "Password updated", {
    admin: updatedAdmin,
  });
};
