import { Request, Response } from "express";
import { userRepo } from "../../repositories/user.repository";
import { BadRequestError } from "../../common/errors";
import { ActionSuccessHandler } from "../../common/responses";
import { deleteFromCloudinary } from "../../common/deleteFromCloudinary";

export const removeUser = async (req: Request, res: Response) => {
  const { id } = req.user!;

  const user = await userRepo.find({ id });

  if (!user) {
    throw new BadRequestError("User not found");
  }

  if (user.profilePicture !== "") {
    deleteFromCloudinary(user.profilePicture);
  }

  await userRepo.remove(user.id);

  return new ActionSuccessHandler(res, "User removed successfully", {}, 200);
};
