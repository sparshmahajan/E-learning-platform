import { query } from "express-validator";

export const getEnrollmentsValidation = [
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
