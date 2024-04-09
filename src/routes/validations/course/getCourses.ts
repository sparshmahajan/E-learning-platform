import { query } from "express-validator";

export const getCoursesValidation = [
  query("category")
    .optional()
    .notEmpty()
    .withMessage("Category must not be empty"),
  query("level").optional().notEmpty().withMessage("Level must not be empty"),
  query("level")
    .optional()
    .isIn(["beginner", "intermediate", "advanced"])
    .withMessage("Level must be one of beginner, intermediate, advanced"),
  query("popularity")
    .optional()
    .custom((value: string, { req }) => {
      const values = value.split("-");
      if (values.length !== 2) {
        throw new Error("Invalid popularity range");
      }

      const [min, max] = [parseInt(values[0]), parseInt(values[1])];

      if (
        isNaN(min) ||
        isNaN(max) ||
        min < 0 ||
        max < 0 ||
        min > max ||
        max > 5
      ) {
        throw new Error("Invalid popularity range");
      }
      //add the values to the request object
      (req.query as any).maxPopularity = max;
      (req.query as any).minPopularity = min;

      return true;
    }),

  query("limit").customSanitizer((value: string | undefined) => {
    if (value === undefined) {
      return 10;
    }
    return parseInt(value);
  }),
  query("limit").custom((value: number) => {
    if (isNaN(value) || value < 1) {
      throw new Error("Invalid page size");
    }
    return true;
  }),
  query("page").customSanitizer((value: string | undefined) => {
    if (value === undefined) {
      return 1;
    }
    return parseInt(value);
  }),
  query("page").custom((value: number) => {
    if (isNaN(value) || value < 0) {
      throw new Error("Invalid page index");
    }
    return true;
  }),
];
