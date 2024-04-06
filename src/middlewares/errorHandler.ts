import { Request, Response, NextFunction } from "express";
import { CustomError } from "../common/errors";
import { deleteFile } from "../common/deleteFile";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (req.file) {
    deleteFile(req.file.path);
  }

  if (err instanceof CustomError) {
    return res
      .status(err.statusCode)
      .send({ message: err.serializeErrors().message });
  }

  console.log(err);
  res.status(500).send({
    message: "Something went wrong",
  });
};
