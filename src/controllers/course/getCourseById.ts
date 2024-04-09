import { Request, Response } from "express";
import { courseRepo } from "../../repositories/course.repository";
import { BadRequestError } from "../../common/errors";
import { ActionSuccessHandler } from "../../common/responses";

export const getCourseById = async (req: Request, res: Response) => {
  const courseId = parseInt(req.params.id);

  const course = await courseRepo.findByIdWithAdminDetails(courseId);

  if (!course) {
    throw new BadRequestError("Course not found");
  }

  return new ActionSuccessHandler(res, "Course fetched successfully", {
    course: course.toJSON(),
  });
};
