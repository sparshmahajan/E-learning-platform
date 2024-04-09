import { Request, Response } from "express";
import { courseRepo } from "../../repositories/course.repository";
import { ActionSuccessHandler } from "../../common/responses";
import { uploadToCloudinary } from "../../common/uploadToCloudinary";
import { deleteFile } from "../../common/deleteFile";

export const createCourse = async (req: Request, res: Response) => {
  const { id } = req.user!;
  const { title, description, category, popularity, level, duration } =
    req.body as {
      title: string;
      description: string;
      category: string;
      popularity: number;
      level: "beginner" | "intermediate" | "advanced";
      duration: number;
    };

  const fileId = req.file!.filename.split(".")[0];
  const image = await uploadToCloudinary("courses", fileId, req.file!, req);

  const course = await courseRepo.create({
    title,
    description,
    category,
    popularity,
    level,
    createdBy: id,
    image,
    duration,
  });

  deleteFile(req.file!.path);

  return new ActionSuccessHandler(res, "Course created successfully", {
    course: course.toJSON(),
  });
};
