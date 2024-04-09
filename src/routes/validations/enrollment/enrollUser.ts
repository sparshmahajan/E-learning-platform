import { body } from "express-validator";

export const enrollUserValidation = [
  body("courseId").notEmpty().withMessage("Course ID is required"),
  body("courseId").isInt({ min: 1 }).withMessage("Invalid course id"),
];
