import express from "express";
const router = express.Router();
import { middlewares } from "../middlewares";
import { enrollmentValidations } from "./validations/enrollment";
import { enrollmentController } from "../controllers/enrollment";

router.post(
  "/",
  middlewares.requireAuth,
  middlewares.userAuth,
  enrollmentValidations.enrollUserValidation,
  middlewares.validateRequest,
  enrollmentController.enrollUser
);

router.get(
  "/",
  middlewares.requireAuth,
  middlewares.userAuth,
  enrollmentValidations.getEnrollmentsValidation,
  middlewares.validateRequest,
  enrollmentController.getEnrollments
);

export { router as enrollmentRouter };
