import { param } from "express-validator";

export const removeCourseValidation = [
  param("id").notEmpty().withMessage("Course ID is required"),
];
