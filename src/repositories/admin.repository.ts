import { BadRequestError } from "../common/errors";
import { generateOtp } from "../common/generateOtp";
import { sendMail } from "../common/sendMail";
import { Admin, AdminCreationAttributes } from "../models/adminModel";

class AdminRepository {
  async find(filter: {}) {
    const admin = await Admin.findOne({
      where: filter,
    });

    return admin;
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

    const admin = await Admin.create({
      ...data,
      otp,
      otpExpires: now,
    } as AdminCreationAttributes);

    return admin.toJSON();
  }

  async verify(id: number) {
    const admin = await Admin.findByPk(id);

    if (!admin) {
      throw new BadRequestError("Admin not found");
    }

    admin.isVerified = true;
    admin.otp = "";

    await admin.save();

    return admin.toJSON();
  }

  async update(id: number, data: {}) {
    const admin = await Admin.findByPk(id);

    if (!admin) {
      throw new BadRequestError("Admin not found");
    }

    await admin.update(data);

    return admin.toJSON();
  }

  async remove(id: number) {
    const admin = await Admin.findByPk(id);

    if (!admin) {
      throw new BadRequestError("Admin not found");
    }

    await admin.destroy();

    return;
  }

  async forgetPassword(email: string) {
    const admin = await Admin.findOne({
      where: {
        email,
      },
    });

    if (!admin || !admin.isVerified) {
      throw new BadRequestError("Admin not found");
    }

    const otp = generateOtp();
    const now = new Date();
    now.setMinutes(now.getMinutes() + 10);

    await sendMail(
      email,
      "Password reset OTP",
      `Your OTP is ${otp}. It will expire in 10 minutes.`
    );

    admin.otp = otp;
    admin.otpExpires = now;

    await admin.save();
  }

  async resetPassword(email: string, otp: string, password: string) {
    const admin = await Admin.findOne({
      where: {
        email,
      },
    });

    if (!admin || !admin.isVerified) {
      throw new BadRequestError("Admin not found");
    }

    if (admin.otp !== otp) {
      throw new BadRequestError("Invalid OTP");
    }

    if (admin.otpExpires < new Date()) {
      throw new BadRequestError("OTP expired");
    }

    admin.password = password;
    admin.otp = "";
    admin.otpExpires = new Date();

    await admin.save();
  }
}

export const adminRepo = new AdminRepository();
