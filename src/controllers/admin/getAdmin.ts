import { Request, Response } from "express";
import { adminRepo } from "../../repositories/admin.repository";
import { BadRequestError } from "../../common/errors";
import { ActionSuccessHandler } from "../../common/responses";

export const getAdmin = async (req: Request, res: Response) => {
  const { id } = req.user!;

  const admin = await adminRepo.find({ id });

  if (!admin) {
    throw new BadRequestError("Admin not found");
  }

  return new ActionSuccessHandler(res, "Admin found", {
    admin: admin.toJSON(),
  });
};
