import { register } from "./register";
import { verifyEmail } from "./verifyEmail";
import { login } from "./login";
import { getUser } from "./getUser";
import { updateDetails } from "./updateDetails";
import { updateProfilePic } from "./updateProfilePic";
import { updatePassword } from "./updatePassword";
import { removeUser } from "./removeUser";
import { forgetPassword } from "./forgetPassword";
import { resetPassword } from "./resetPassword";

export const userController = {
  register,
  verifyEmail,
  login,
  getUser,
  updateDetails,
  updateProfilePic,
  updatePassword,
  removeUser,
  forgetPassword,
  resetPassword,
};
