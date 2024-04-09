import {
  Enrollment,
  EnrollmentCreationAttributes,
} from "../models/enrollmentModel";
import { Admin } from "../models/adminModel";
import { Course } from "../models/courseModel";

class EnrollmentRepository {
  async isEnrolled(userId: number, courseId: number) {
    const enrollment = await Enrollment.findOne({
      where: {
        userId: userId,
        courseId: courseId,
      },
    });
    if (enrollment) {
      return true;
    }
    return false;
  }

  async create(enrollment: EnrollmentCreationAttributes) {
    const newEnrollment = await Enrollment.create(enrollment);
    return newEnrollment;
  }

  async getEnrollmentsForUser(
    userId: number,
    { limit, offset }: { limit: number; offset: number }
  ) {
    const totalEnrollmentsPromise = Enrollment.count({
      where: {
        userId: userId,
      },
    });

    const enrollmentsPromise = Enrollment.findAll({
      where: {
        userId: userId,
      },
      attributes: ["id", "createdAt"],
      order: [["createdAt", "DESC"]],
      limit: limit,
      offset: offset,
      include: [
        {
          model: Course,
          as: "course",
          attributes: [
            "id",
            "title",
            "description",
            "image",
            "category",
            "popularity",
            "level",
            "duration",
          ],
          include: [
            {
              model: Admin,
              as: "instructor",
              attributes: ["id", "name", "email"],
            },
          ],
        },
      ],
    });

    const [enrollments, totalEnrollments] = await Promise.all([
      enrollmentsPromise,
      totalEnrollmentsPromise,
    ]);

    return { enrollments, totalEnrollments };
  }
}

export const enrollmentRepo = new EnrollmentRepository();
