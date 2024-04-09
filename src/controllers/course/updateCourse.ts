import { Request, Response } from "express";
import { courseRepo } from "../../repositories/course.repository";
import { ActionSuccessHandler } from "../../common/responses";
import { BadRequestError } from "../../common/errors";
import { uploadToCloudinary } from "../../common/uploadToCloudinary";
import { deleteFromCloudinary } from "../../common/deleteFromCloudinary";
import { deleteFile } from "../../common/deleteFile";

export const updateCourse = async (req: Request, res: Response) => {
  const { id } = req.user!;
  const courseId = parseInt(req.params.id);

  const { title, description, category, popularity, level, duration } =
    req.body as {
      title: string;
      description: string;
      category: string;
      popularity: number;
      level: "beginner" | "intermediate" | "advanced";
      duration: number;
    };

  const course = await courseRepo.findById(courseId);

  if (!course) {
    throw new BadRequestError("Course not found");
  }

  if (course.createdBy !== id) {
    throw new BadRequestError("You are not authorized to update this course");
  }

  let image = course.image;

  if (req.file) {
    const fileId = req.file.filename.split(".")[0];
    image = await uploadToCloudinary("courses", fileId, req.file!, req);
    deleteFromCloudinary(course.image);
    deleteFile(req.file.path);
  }

  const updatedCourse = await courseRepo.update(courseId, {
    title,
    description,
    category,
    popularity,
    level,
    image,
    duration,
  });

  return new ActionSuccessHandler(res, "Course updated successfully", {
    course: updatedCourse,
  });
};
