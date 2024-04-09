import express from "express";
const router = express.Router();
import { middlewares } from "../middlewares";
import { courseValidations } from "./validations/course";
import { courseController } from "../controllers/course";

router.post(
  "/",
  middlewares.uploadImageMiddleware,
  middlewares.requireAuth,
  middlewares.adminAuth,
  courseValidations.createCourseValidation,
  middlewares.validateRequest,
  courseController.createCourse
);

router.get(
  "/:id",
  middlewares.requireAuth,
  courseValidations.getCourseByIdValidation,
  middlewares.validateRequest,
  courseController.getCourseById
);

router.get(
  "/",
  middlewares.requireAuth,
  courseValidations.getCoursesValidation,
  middlewares.validateRequest,
  courseController.getCourses
);

router.put(
  "/:id",
  middlewares.requireAuth,
  middlewares.adminAuth,
  middlewares.uploadImageMiddleware,
  courseValidations.updateCourseValidation,
  middlewares.validateRequest,
  courseController.updateCourse
);

router.delete(
  "/:id",
  middlewares.requireAuth,
  middlewares.adminAuth,
  courseValidations.removeCourseValidation,
  middlewares.validateRequest,
  courseController.removeCourse
);

export { router as courseRouter };
