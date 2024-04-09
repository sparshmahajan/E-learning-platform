import {
  Table,
  Column,
  Model,
  DataType,
  BeforeSave,
} from "sequelize-typescript";
import { getToken } from "../security/jwt";
import { Encrypt, Decrypt } from "../security/bcrypt";
import { Optional } from "sequelize";

interface UserAttributes {
  id: number;
  name: string;
  email: string;
  password?: string;
  profilePicture: string;
  otp?: string;
  otpExpires?: Date;
  isVerified?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UserCreationAttributes
  extends Optional<UserAttributes, "id"> {}

@Table({
  tableName: "users",
  modelName: "user",
  timestamps: true,
})
export class User extends Model<UserAttributes, UserCreationAttributes> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  declare email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare password: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare profilePicture: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  declare isVerified: boolean;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  declare otp: string;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  declare otpExpires: Date;

  @BeforeSave
  static async hashPassword(instance: User) {
    if (instance.changed("password")) {
      instance.password = await Encrypt(instance.password);
    }
  }

  @BeforeSave
  static capitalize(instance: User) {
    if (instance.changed("name")) {
      instance.name = instance.name
        .split(" ")
        .map((word) => {
          return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        })
        .join(" ");
    }
  }

  @BeforeSave
  static toLowerCase(instance: User) {
    if (instance.changed("email")) {
      instance.email = instance.email.toLowerCase();
    }
  }

  async comparePassword(password: string) {
    const matched = Decrypt(password, this.password);
    return matched;
  }

  generateToken() {
    return getToken({
      id: this.id,
      email: this.email,
      type: "user",
    });
  }

  toJSON() {
    const user = { ...this.get() };
    delete user.password;
    delete user.otp;
    delete user.otpExpires;
    delete user.isVerified;
    return user;
  }
}

export default User;
