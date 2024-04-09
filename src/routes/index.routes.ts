import { Application } from "express";
import { NotFoundError } from "../common/errors";
import { userRouter } from "./user.routes";
import { adminRouter } from "./admin.routes";
import { courseRouter } from "./course.routes";

export default (app: Application) => {
  app.use("/api/user", userRouter);
  app.use("/api/admin", adminRouter);
  app.use("/api/course", courseRouter);

  app.use("*", (_req, _res) => {
    throw new NotFoundError("Route not found");
  });
};
