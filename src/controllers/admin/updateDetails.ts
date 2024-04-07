import { Request, Response } from "express";
import { adminRepo } from "../../repositories/admin.repository";
import { BadRequestError } from "../../common/errors";
import { ActionSuccessHandler } from "../../common/responses";

export const updateDetails = async (req: Request, res: Response) => {
  const { name, email } = req.body as {
    name: string;
    email: string;
  };

  const { id } = req.user!;

  const admin = await adminRepo.find({ id });

  if (!admin) {
    throw new BadRequestError("admin not found");
  }

  const updatedAdmin = await adminRepo.update(admin.id, {
    name,
    email,
  });

  return new ActionSuccessHandler(res, "admin details updated", {
    admin: updatedAdmin,
  });
};
