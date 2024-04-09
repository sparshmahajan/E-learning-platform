import { createCourseValidation } from "./createCourse";
import { getCourseByIdValidation } from "./getCourseById";
import { getCoursesValidation } from "./getCourses";
import { updateCourseValidation } from "./updateCourse";
import { removeCourseValidation } from "./removeCourse";

export const courseValidations = {
  createCourseValidation,
  getCourseByIdValidation,
  getCoursesValidation,
  updateCourseValidation,
  removeCourseValidation,
};
