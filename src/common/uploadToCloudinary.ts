import { Request } from "express";
import { cloudinary } from "../config/cloudinary";
import { InternalServerError } from "./errors";

declare module "express" {
  interface Request {
    image?: string;
  }
}

export const uploadToCloudinary = async (
  folderPath: string,
  id: string,
  file: Express.Multer.File,
  req: Request
) => {
  try {
    const result = await cloudinary.uploader.upload(file.path, {
      folder: `${folderPath}`,
      overwrite: true,
      access_mode: "public",
      public_id: id,
    });
    req.image = result.public_id;
    return result.secure_url;
  } catch (error) {
    console.log(error);
    throw new InternalServerError("Error uploading image");
  }
};
