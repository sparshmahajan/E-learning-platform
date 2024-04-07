import { Request, Response } from "express";
import { adminRepo } from "../../repositories/admin.repository";
import { BadRequestError } from "../../common/errors";
import { ActionSuccessHandler } from "../../common/responses";
import { deleteFromCloudinary } from "../../common/deleteFromCloudinary";

export const removeAdmin = async (req: Request, res: Response) => {
  const { id } = req.user!;

  const admin = await adminRepo.find({ id });

  if (!admin) {
    throw new BadRequestError("admin not found");
  }

  if (admin.profilePicture !== "") {
    const publicId =
      "profile_pictures/" +
      admin.profilePicture.split("/").pop()!.split(".").slice(0, -1).join(".");
    deleteFromCloudinary(publicId);
  }

  await adminRepo.remove(admin.id);

  return new ActionSuccessHandler(res, "admin removed successfully", {}, 200);
};
