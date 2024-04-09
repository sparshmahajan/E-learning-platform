import {
  Table,
  Column,
  Model,
  DataType,
  BelongsTo,
  ForeignKey,
} from "sequelize-typescript";
import { Optional } from "sequelize";
import { Course } from "./courseModel";
import { User } from "./userModel";

interface EnrollmentAttributes {
  id: number;
  courseId: number;
  userId: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface EnrollmentCreationAttributes
  extends Optional<EnrollmentAttributes, "id"> {}

@Table({
  tableName: "enrollments",
  modelName: "enrollment",
  timestamps: true,
})
export class Enrollment extends Model<
  EnrollmentAttributes,
  EnrollmentCreationAttributes
> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @ForeignKey(() => Course)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare courseId: string;

  @BelongsTo(() => Course)
  declare course: Course;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare userId: string;

  @BelongsTo(() => User)
  declare user: User;
}

export default Enrollment;
