import express from "express";
const router = express.Router();
import { middlewares } from "../middlewares";
import { userValidations } from "./validations/user";
import { userController } from "../controllers/user";

router.post(
  "/register",
  middlewares.uploadImageMiddleware,
  userValidations.registerValidation,
  middlewares.validateRequest,
  userController.register
);

router.post(
  "/verify",
  userValidations.verifyEmailValidation,
  middlewares.validateRequest,
  userController.verifyEmail
);

router.post(
  "/login",
  userValidations.loginValidation,
  middlewares.validateRequest,
  userController.login
);

router.get(
  "/",
  middlewares.requireAuth,
  middlewares.userAuth,
  userController.getUser
);

router.put(
  "/",
  middlewares.requireAuth,
  middlewares.userAuth,
  userValidations.updateDetailsValidation,
  middlewares.validateRequest,
  userController.updateDetails
);

router.put(
  "/profile-pic",
  middlewares.requireAuth,
  middlewares.userAuth,
  middlewares.uploadImageMiddleware,
  userController.updateProfilePic
);

router.put(
  "/password",
  middlewares.requireAuth,
  middlewares.userAuth,
  userValidations.updatePasswordValidation,
  middlewares.validateRequest,
  userController.updatePassword
);

router.delete(
  "/",
  middlewares.requireAuth,
  middlewares.userAuth,
  userController.removeUser
);

router.post(
  "/forgot-password",
  userValidations.forgetPasswordValidation,
  middlewares.validateRequest,
  userController.forgetPassword
);

router.post(
  "/reset-password",
  userValidations.resetPasswordValidation,
  middlewares.validateRequest,
  userController.resetPassword
);

export { router as userRouter };
