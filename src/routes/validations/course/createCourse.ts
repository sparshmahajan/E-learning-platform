import { body } from "express-validator";

export const createCourseValidation = [
  body("title").notEmpty().withMessage("Title is required"),
  body("description").notEmpty().withMessage("Description is required"),
  body("duration").notEmpty().withMessage("Duration is required"),
  body("duration").customSanitizer((value: string | number) => {
    if (typeof value === "string") {
      return parseInt(value);
    }
    return value;
  }),
  body("duration").isInt({ min: 1 }).withMessage("Invalid duration"),
  body("category").notEmpty().withMessage("Category is required"),
  body("category").isString().withMessage("Invalid category"),
  body("popularity").notEmpty().withMessage("Popularity is required"),
  body("popularity").customSanitizer((value: string | number) => {
    if (typeof value === "string") {
      return parseFloat(value);
    }
    return value;
  }),
  body("popularity")
    .isFloat({ min: 0.1, max: 5.0 })
    .withMessage("Invalid popularity"),
  body("level").notEmpty().withMessage("Level is required"),
  body("level")
    .isString()
    .isIn(["beginner", "intermediate", "advanced"])
    .withMessage("Invalid level"),
  body("image").custom((value: any, { req }) => {
    if (!req.file) {
      throw new Error("Image is required");
    }
    return true;
  }),
];
