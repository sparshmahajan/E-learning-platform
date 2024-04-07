import { body } from "express-validator";

export const resetPasswordValidation = [
  body("email").notEmpty().withMessage("Email is required"),
  body("password").notEmpty().withMessage("Password is required"),
  body("otp").notEmpty().withMessage("OTP is required"),
  body("otp").isLength({ min: 4, max: 4 }).withMessage("Invalid OTP"),
  body("email").isEmail().withMessage("Invalid email"),
  body("password")
    .isLength({ min: 8 })
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]*$/
    )
    .withMessage(
      "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character and must be minimum 8 characters long"
    ),
];
