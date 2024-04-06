import { Application } from "express";
import { NotFoundError } from "../common/errors";
import { authRoutes } from "./auth.routes";

export default (app: Application) => {
  app.use("/api/auth", authRoutes);

  app.use("*", (_req, _res) => {
    throw new NotFoundError("Route not found");
  });
};
