import { Request, Response } from "express";
import { adminRepo } from "../../repositories/admin.repository";
import { BadRequestError } from "../../common/errors";
import { ActionSuccessHandler } from "../../common/responses";

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body as {
    email: string;
    password: string;
  };

  const admin = await adminRepo.find({ email });

  if (!admin) {
    throw new BadRequestError("Invalid Credentials");
  }

  const passwordMatch = await admin.comparePassword(password);

  if (!passwordMatch) {
    throw new BadRequestError("Invalid Credentials");
  }

  if (!admin.isVerified) {
    throw new BadRequestError("Please verify your email");
  }

  const token = admin.generateToken();

  req.session = {
    jwt: token,
  };

  return new ActionSuccessHandler(res, "Login successful", {
    admin: admin.toJSON(),
  });
};
