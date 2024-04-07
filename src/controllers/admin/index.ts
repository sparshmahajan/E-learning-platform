import { register } from "./register";
import { verifyEmail } from "./verifyEmail";
import { login } from "./login";
import { getAdmin } from "./getAdmin";
import { updateDetails } from "./updateDetails";
import { updateProfilePic } from "./updateProfilePic";
import { updatePassword } from "./updatePassword";
import { removeAdmin } from "./removeAdmin";
import { forgetPassword } from "./forgetPassword";
import { resetPassword } from "./resetPassword";

export const adminController = {
  register,
  verifyEmail,
  login,
  getAdmin,
  updateDetails,
  updateProfilePic,
  updatePassword,
  removeAdmin,
  forgetPassword,
  resetPassword,
};
