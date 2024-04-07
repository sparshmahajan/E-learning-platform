import { errorHandler } from "./errorHandler";
import { validateRequest } from "./validateRequest";
import { uploadImageMiddleware } from "./multer";
import { requireAuth } from "./requireAuth";
import { userAuth } from "./userAuth";

export const middlewares = {
  errorHandler,
  validateRequest,
  uploadImageMiddleware,
  requireAuth,
  userAuth,
};
