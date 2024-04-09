import { Request, Response } from "express";
import { enrollmentRepo } from "../../repositories/enrollment.repository";
import { BadRequestError } from "../../common/errors";
import { ActionSuccessHandler } from "../../common/responses";
import { courseRepo } from "../../repositories/course.repository";
import { sendMail } from "../../common/sendMail";

export const enrollUser = async (req: Request, res: Response) => {
  const { id: userId, email } = req.user!;
  const { courseId } = req.body as { courseId: number };

  const course = await courseRepo.findByIdWithAdminDetails(courseId);

  if (!course) {
    throw new BadRequestError("Course not found");
  }

  const isEnrolled = await enrollmentRepo.isEnrolled(userId, courseId);
  if (isEnrolled) {
    throw new BadRequestError("User is already enrolled in this course");
  }

  const newEnrollment = await enrollmentRepo.create({
    userId,
    courseId,
  });

  sendMail(
    course.instructor.email,
    "New Enrollment",
    `A new user has enrolled in your course ${course.title}`
  );
  sendMail(
    email,
    "Enrollment Confirmation",
    `You have successfully enrolled in the course ${course.title}`
  );

  return new ActionSuccessHandler(
    res,
    "User enrolled successfully",
    {
      enrollment: newEnrollment,
    },
    201
  );
};
