import { Request, Response } from "express";
import { courseRepo } from "../../repositories/course.repository";
import { EntriesFoundHandler } from "../../common/responses";
import { Op } from "sequelize";

export const getCourses = async (req: Request, res: Response) => {
  const { category, level } = req.query as {
    category?: string;
    level?: string;
  };

  const minPopularity = parseInt(req.query.minPopularity as string) || 0;
  const maxPopularity = parseInt(req.query.maxPopularity as string) || 5;

  const limit = parseInt(req.query.limit as string);
  const page = parseInt(req.query.page as string);

  const skip = (page - 1) * limit;

  const { courses, totalCourses } = await courseRepo.find(
    {
      category,
      level,
      popularity: { [Op.gt]: minPopularity, [Op.lte]: maxPopularity },
    },
    {
      limit,
      offset: skip,
    }
  );

  return new EntriesFoundHandler(
    res,
    "Courses found successfully",
    courses,
    courses.length,
    {
      page,
      limit,
      total: totalCourses,
    }
  );
};
