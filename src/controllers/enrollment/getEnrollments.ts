import { Request, Response } from "express";
import { enrollmentRepo } from "../../repositories/enrollment.repository";
import { EntriesFoundHandler } from "../../common/responses";

export const getEnrollments = async (req: Request, res: Response) => {
  const { id: userId } = req.user!;

  const limit = parseInt(req.query.limit as string);
  const page = parseInt(req.query.page as string);

  const skip = (page - 1) * limit;

  const { enrollments, totalEnrollments } =
    await enrollmentRepo.getEnrollmentsForUser(userId, {
      limit,
      offset: skip,
    });

  return new EntriesFoundHandler(
    res,
    "Enrollments found",
    enrollments,
    enrollments.length,
    {
      page,
      limit,
      total: totalEnrollments,
    }
  );
};
