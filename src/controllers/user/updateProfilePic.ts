import { Request, Response } from "express";
import { userRepo } from "../../repositories/user.repository";
import { BadRequestError } from "../../common/errors";
import { ActionSuccessHandler } from "../../common/responses";
import { uploadToCloudinary } from "../../common/uploadToCloudinary";
import { deleteFile } from "../../common/deleteFile";
import { deleteFromCloudinary } from "../../common/deleteFromCloudinary";

export const updateProfilePic = async (req: Request, res: Response) => {
  const { id } = req.user!;

  const user = await userRepo.find({ id });

  if (!user) {
    throw new BadRequestError("User not found");
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

  if (user.profilePicture !== "") {
    const publicId =
      "profile_pictures/" +
      user.profilePicture.split("/").pop()!.split(".").slice(0, -1).join(".");
    deleteFromCloudinary(publicId);
  }

  const updatedUser = await userRepo.update(user.id, {
    profilePicture,
  });

  if (image) {
    deleteFile(image.path);
  }

  return new ActionSuccessHandler(res, "Profile picture updated successfully", {
    user: updatedUser,
  });
};
