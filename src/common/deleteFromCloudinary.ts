import { cloudinary } from "../config/cloudinary";
import { InternalServerError } from "./errors";

export const deleteFromCloudinary = async (url: string) => {
  try {
    const public_id = url.split("/").pop()!;
    await cloudinary.uploader.destroy(public_id);
    console.log("Image deleted successfully");
  } catch (error) {
    console.error("Error deleting image: ", error);
    throw new InternalServerError("Error deleting image");
  }
};
