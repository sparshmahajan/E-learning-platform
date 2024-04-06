import { User, UserCreationAttributes } from "../models/userModel";

class UserRepository {
  async find(filter: {}) {
    return User.findOne({
      where: filter,
    });
  }

  async create(data: UserCreationAttributes) {
    const user = await User.create(data);
    return user;
  }
}

export const userRepo = new UserRepository();
