import express from "express";
const router = express.Router();
import { middlewares } from "../middlewares";
import { adminValidations } from "./validations/admin";
import { adminController } from "../controllers/admin";

router.post(
  "/register",
  middlewares.uploadImageMiddleware,
  adminValidations.registerValidation,
  middlewares.validateRequest,
  adminController.register
);

router.post(
  "/verify",
  adminValidations.verifyEmailValidation,
  middlewares.validateRequest,
  adminController.verifyEmail
);

router.post(
  "/login",
  adminValidations.loginValidation,
  middlewares.validateRequest,
  adminController.login
);

router.get(
  "/",
  middlewares.requireAuth,
  middlewares.adminAuth,
  adminController.getAdmin
);

router.put(
  "/",
  middlewares.requireAuth,
  middlewares.adminAuth,
  adminValidations.updateDetailsValidation,
  middlewares.validateRequest,
  adminController.updateDetails
);

router.put(
  "/profile-pic",
  middlewares.requireAuth,
  middlewares.adminAuth,
  middlewares.uploadImageMiddleware,
  adminController.updateProfilePic
);

router.put(
  "/password",
  middlewares.requireAuth,
  middlewares.adminAuth,
  adminValidations.updatePasswordValidation,
  middlewares.validateRequest,
  adminController.updatePassword
);

router.delete(
  "/",
  middlewares.requireAuth,
  middlewares.adminAuth,
  adminController.removeAdmin
);

router.post(
  "/forgot-password",
  adminValidations.forgetPasswordValidation,
  middlewares.validateRequest,
  adminController.forgetPassword
);

router.post(
  "/reset-password",
  adminValidations.resetPasswordValidation,
  middlewares.validateRequest,
  adminController.resetPassword
);

export { router as adminRouter };
