import { body } from "express-validator";

export const forgetPasswordValidation = [
  body("email").notEmpty().withMessage("Email is required"),
  body("email").isEmail().withMessage("Invalid email"),
];
