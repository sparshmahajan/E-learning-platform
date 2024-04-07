import { body } from "express-validator";

export const updatePasswordValidation = [
  body("oldPassword").notEmpty().withMessage("Old password is required"),
  body("newPassword").notEmpty().withMessage("New password is required"),
  body("oldPassword")
    .isLength({ min: 8 })
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]*$/
    )
    .withMessage("Invalid old password"),
  body("newPassword")
    .isLength({ min: 8 })
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]*$/
    )
    .withMessage(
      "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character and must be minimum 8 characters long"
    ),
  //oldPassword and newPassword should not be same
  body("newPassword").custom((value, { req }) => {
    if (value === req.body.oldPassword) {
      throw new Error("New password should not be same as old password");
    } else {
      return true;
    }
  }),
];
