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
  id: string;
  name: string;
  email: string;
  password?: string;
  profilePicture?: string;
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
  declare id: string;

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
    unique: true,
  })
  declare mobileNumber: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    defaultValue: "",
  })
  declare profilePicture: string;

  @BeforeSave
  static async hashPassword(instance: User) {
    instance.password = await Encrypt(instance.password);
  }

  @BeforeSave
  static capitalize(instance: User) {
    instance.name = instance.name
      .split(" ")
      .map((word) => {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      })
      .join(" ");
  }

  @BeforeSave
  static toLowerCase(instance: User) {
    instance.email = instance.email.toLowerCase();
  }

  comparePassword(password: string) {
    return Decrypt(password, this.password);
  }

  generateToken() {
    return getToken({
      id: this.id,
      email: this.email,
    });
  }

  toJSON() {
    const user = { ...this.get() };
    delete user.password;
    return user;
  }
}

export default User;
