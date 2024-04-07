import { body } from "express-validator";

export const verifyEmailValidation = [
  body("email").notEmpty().withMessage("Email is required"),
  body("otp").notEmpty().withMessage("OTP is required"),
  body("otp").isLength({ min: 4, max: 4 }).withMessage("Invalid OTP"),
  body("email").isEmail().withMessage("Invalid email"),
];
