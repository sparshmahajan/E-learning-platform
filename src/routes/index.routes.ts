import { Application } from "express";
import { NotFoundError } from "../common/errors";
import { userRouter } from "./user.routes";

export default (app: Application) => {
  app.use("/api/user", userRouter);

  app.use("*", (_req, _res) => {
    throw new NotFoundError("Route not found");
  });
};
