import { registerValidation } from "./register";
import { verifyEmailValidation } from "./verifyEmail";
import { loginValidation } from "./login";
import { updateDetailsValidation } from "./updateDetails";
import { updatePasswordValidation } from "./updatePassword";
import { forgetPasswordValidation } from "./forgetPassword";
import { resetPasswordValidation } from "./resetPassword";

export const userValidations = {
  registerValidation,
  verifyEmailValidation,
  loginValidation,
  updateDetailsValidation,
  updatePasswordValidation,
  forgetPasswordValidation,
  resetPasswordValidation,
};
