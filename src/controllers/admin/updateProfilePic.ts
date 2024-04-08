import { Request, Response } from "express";
import { adminRepo } from "../../repositories/admin.repository";
import { BadRequestError } from "../../common/errors";
import { ActionSuccessHandler } from "../../common/responses";
import { uploadToCloudinary } from "../../common/uploadToCloudinary";
import { deleteFile } from "../../common/deleteFile";
import { deleteFromCloudinary } from "../../common/deleteFromCloudinary";

export const updateProfilePic = async (req: Request, res: Response) => {
  const { id } = req.user!;

  const admin = await adminRepo.find({ id });

  if (!admin) {
    throw new BadRequestError("Admin not found");
  }

  const image = req.file;

  let profilePicture = "";

  if (image) {
    profilePicture = await uploadToCloudinary(
      "profile_pictures",
      image.filename,
      image,
      req
    );
  }

  if (admin.profilePicture !== "") {
    deleteFromCloudinary(admin.profilePicture);
  }

  const updatedadmin = await adminRepo.update(admin.id, {
    profilePicture,
  });

  if (image) {
    deleteFile(image.path);
  }

  return new ActionSuccessHandler(res, "Profile picture updated successfully", {
    admin: updatedadmin,
  });
};
