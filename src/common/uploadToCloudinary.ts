import { cloudinary } from "../config/cloudinary";

export const uploadToCloudinary = async (
  folderPath: string,
  id: string,
  file: Express.Multer.File
) => {
  try {
    const result = await cloudinary.uploader.upload(file.path, {
      folder: `${folderPath}/${id}`,
      resource_type: "auto",
      overwrite: true,
      access_mode: "public",
      public_id: id,
    });
    return result.secure_url;
  } catch (error) {
    console.log(error);
    throw new Error(`Error uploading image to cloudinary`);
  }
};
