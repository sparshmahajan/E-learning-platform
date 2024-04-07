import { Request, Response } from "express";
import { userRepo } from "../../repositories/user.repository";
import { BadRequestError } from "../../common/errors";
import { ActionSuccessHandler } from "../../common/responses";

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body as {
    email: string;
    password: string;
  };

  const user = await userRepo.find({ email });

  if (!user) {
    throw new BadRequestError("Invalid Credentials");
  }

  const passwordMatch = await user.comparePassword(password);

  if (!passwordMatch) {
    throw new BadRequestError("Invalid Credentials");
  }

  if (!user.isVerified) {
    throw new BadRequestError("Please verify your email");
  }

  const token = user.generateToken();

  req.session = {
    jwt: token,
  };

  return new ActionSuccessHandler(res, "Login successful", {
    user: user.toJSON(),
  });
};
