import {
  Table,
  Column,
  Model,
  DataType,
  BelongsTo,
  ForeignKey,
} from "sequelize-typescript";
import { Optional } from "sequelize";
import { Admin } from "./adminModel";

interface CourseAttributes {
  id: number;
  createdBy: number;
  title: string;
  description: string;
  image: string;
  category: string;
  popularity: number;
  level: "beginner" | "intermediate" | "advanced";
  duration: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CourseCreationAttributes
  extends Optional<CourseAttributes, "id"> {}

@Table({
  tableName: "courses",
  modelName: "course",
  timestamps: true,
})
export class Course extends Model<CourseAttributes, CourseCreationAttributes> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @ForeignKey(() => Admin)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare createdBy: number;

  @BelongsTo(() => Admin)
  declare instructor: Admin;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare title: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  declare description: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare image: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare category: string;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
    validate: {
      min: 0.1,
      max: 5.0,
    },
  })
  declare popularity: number;

  @Column({
    type: DataType.ENUM("beginner", "intermediate", "advanced"),
    allowNull: false,
  })
  declare level: "beginner" | "intermediate" | "advanced";

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare duration: number;
}

export default Course;
