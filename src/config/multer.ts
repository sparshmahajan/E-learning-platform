import { NextFunction, Request, Response } from "express";
import multer from "multer";

import path from "path";
import { BadRequestError } from "../common/errors";

const uploadImage = multer({
  storage: multer.diskStorage({
    destination: (
      req: Request,
      file: Express.Multer.File,
      cb: (error: Error | null, destination: string) => void
    ) => {
      cb(null, "uploads/");
    },
    filename: (
      _req: Request,
      file: Express.Multer.File,
      cb: (error: Error | null, filename: string) => void
    ) => {
      const ext = path.extname(file.originalname);
      const name = path.basename(file.originalname, ext);
      cb(null, name + "_" + Date.now() + ext);
    },
  }),
  fileFilter: (
    _req: Request,
    file: Express.Multer.File,
    cb: multer.FileFilterCallback
  ) => {
    const fileExts = [".jpg", ".jpeg", ".png"];
    const isAllowedExt = fileExts.includes(
      path.extname(file.originalname).toLowerCase()
    );
    const isAllowedMimeType = file.mimetype.startsWith("image/");
    if (isAllowedExt && isAllowedMimeType) {
      return cb(null, true);
    } else {
      cb(new Error("Only images are allowed"));
    }
  },
  limits: {
    fileSize: 1024 * 1024 * 5, // 5MB
  },
});

export const uploadImageMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  uploadImage.single("image")(req, res, function (err) {
    if (err) {
      next(new BadRequestError(err.message));
    }
    next();
  });
};
