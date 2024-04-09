import { Request, Response } from "express";
import { courseRepo } from "../../repositories/course.repository";
import { ActionSuccessHandler } from "../../common/responses";
import { BadRequestError } from "../../common/errors";
import { deleteFromCloudinary } from "../../common/deleteFromCloudinary";

export const removeCourse = async (req: Request, res: Response) => {
  const { id } = req.user!;
  const courseId = parseInt(req.params.id);

  const course = await courseRepo.findById(courseId);

  if (!course) {
    throw new BadRequestError("Course not found");
  }

  if (course.createdBy !== id) {
    throw new BadRequestError("You are not authorized to delete this course");
  }

  await courseRepo.delete(courseId);
  await deleteFromCloudinary(course.image);

  return new ActionSuccessHandler(res, "Course deleted successfully", {});
};
