import { Request, Response } from "express";
import { userRepo } from "../../repositories/user.repository";
import { BadRequestError } from "../../common/errors";
import { ActionSuccessHandler } from "../../common/responses";
import { uploadToCloudinary } from "../../common/uploadToCloudinary";
import { deleteFile } from "../../common/deleteFile";

export const register = async (req: Request, res: Response) => {
  const { name, email, password } = req.body as {
    name: string;
    email: string;
    password: string;
  };

  const user = await userRepo.find({ email });

  if (user) {
    throw new BadRequestError("User already exists");
  }

  const image = req.file;

  let profilePicture = "";

  if (image) {
    const id = image.filename.split(".")[0];
    profilePicture = await uploadToCloudinary(
      "profile_pictures",
      id,
      image,
      req
    );
  }

  const newUser = await userRepo.create({
    name,
    email,
    password,
    profilePicture,
  });

  if (image) {
    deleteFile(image.path);
  }

  return new ActionSuccessHandler(
    res,
    "User created successfully",
    newUser,
    201
  );
};
