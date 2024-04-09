import { param } from "express-validator";

export const getCourseByIdValidation = [
  param("id").notEmpty().withMessage("Course ID is required"),
];
