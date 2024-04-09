import { BadRequestError } from "../common/errors";
import { Admin } from "../models/adminModel";
import { Course, CourseCreationAttributes } from "../models/courseModel";

class CourseRepository {
  async create(course: CourseCreationAttributes) {
    const newCourse = await Course.create(course);
    return newCourse;
  }

  async find(filter: {}, { limit, offset }: { limit: number; offset: number }) {
    Object.keys(filter).forEach((key) => {
      if (filter[key as keyof typeof filter] === undefined) {
        delete filter[key as keyof typeof filter];
      }
    });

    const totalCoursesPromise = Course.count({
      where: filter,
    });

    const coursesPromise = Course.findAll({
      where: filter,
      order: [["createdAt", "DESC"]],
      limit: limit,
      offset: offset,
    });

    const [courses, totalCourses] = await Promise.all([
      coursesPromise,
      totalCoursesPromise,
    ]);

    return { courses, totalCourses };
  }

  async findByIdWithAdminDetails(id: number) {
    const course = await Course.findOne({
      where: {
        id: id,
      },
      include: [
        {
          model: Admin,
          as: "instructor",
          attributes: ["id", "name", "email"],
        },
      ],
    });

    if (!course) {
      throw new BadRequestError("Course not found");
    }

    return course;
  }

  async findById(id: number) {
    const course = await Course.findByPk(id);
    return course;
  }

  async update(
    id: number,
    course: Omit<CourseCreationAttributes, "createdBy">
  ) {
    const existingCourse = await Course.findByPk(id);

    if (!existingCourse) {
      throw new BadRequestError("Course not found");
    }

    existingCourse.title = course.title;
    existingCourse.description = course.description;
    existingCourse.category = course.category;
    existingCourse.popularity = course.popularity;
    existingCourse.level = course.level;
    existingCourse.image = course.image;
    existingCourse.duration = course.duration;
    existingCourse.updatedAt = new Date();

    await existingCourse.save();

    return existingCourse;
  }

  async delete(id: number) {
    await Course.destroy({
      where: {
        id: id,
      },
    });
  }
}

export const courseRepo = new CourseRepository();
