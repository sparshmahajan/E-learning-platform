import { Request, Response } from "express";
import { adminRepo } from "../../repositories/admin.repository";
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

  const admin = await adminRepo.find({ email });

  if (admin) {
    throw new BadRequestError("Admin already exists");
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

  const newAdmin = await adminRepo.create({
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
    "Admin created successfully",
    newAdmin,
    201
  );
};
