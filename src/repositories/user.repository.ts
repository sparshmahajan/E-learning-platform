import { BadRequestError } from "../common/errors";
import { generateOtp } from "../common/generateOtp";
import { sendMail } from "../common/sendMail";
import { User, UserCreationAttributes } from "../models/userModel";

class UserRepository {
  async find(filter: {}) {
    return User.findOne({
      where: filter,
    });
  }

  async create(data: {
    name: string;
    email: string;
    password: string;
    profilePicture: string;
  }) {
    const otp = generateOtp();
    const now = new Date();
    now.setMinutes(now.getMinutes() + 10);

    await sendMail(
      data.email,
      "One Time Password (OTP) verification",
      `Your OTP is ${otp}. It will expire in 10 minutes.`
    );

    const user = await User.create({
      ...data,
      otp,
      otpExpires: now,
    } as UserCreationAttributes);

    return user.toJSON();
  }

  async verify(id: string) {
    const user = await User.findByPk(id);

    if (!user) {
      throw new BadRequestError("User not found");
    }

    user.isVerified = true;
    user.otp = "";

    await user.save();

    return user.toJSON();
  }

  async update(id: string, data: {}) {
    const user = await User.findByPk(id);

    if (!user) {
      throw new BadRequestError("User not found");
    }

    await user.update(data);

    return user.toJSON();
  }

  async remove(id: string) {
    const user = await User.findByPk(id);

    if (!user) {
      throw new BadRequestError("User not found");
    }

    await user.destroy();

    return;
  }

  async forgetPassword(email: string) {
    const user = await User.findOne({
      where: {
        email,
      },
    });

    if (!user || !user.isVerified) {
      throw new BadRequestError("User not found");
    }

    const otp = generateOtp();
    const now = new Date();
    now.setMinutes(now.getMinutes() + 10);

    await sendMail(
      email,
      "Password reset OTP",
      `Your OTP is ${otp}. It will expire in 10 minutes.`
    );

    user.otp = otp;
    user.otpExpires = now;

    await user.save();
  }

  async resetPassword(email: string, otp: string, password: string) {
    const user = await User.findOne({
      where: {
        email,
      },
    });

    if (!user || !user.isVerified) {
      throw new BadRequestError("User not found");
    }

    if (user.otp !== otp) {
      throw new BadRequestError("Invalid OTP");
    }

    if (user.otpExpires < new Date()) {
      throw new BadRequestError("OTP expired");
    }

    user.password = password;
    user.otp = "";
    user.otpExpires = new Date();

    await user.save();
  }
}

export const userRepo = new UserRepository();
