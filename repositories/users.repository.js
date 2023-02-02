class UserRepository {
  constructor(UserModel) {
    this.userModel = UserModel;
  }

  findById = async (id) => {
    const userById = await this.userModel.findAll({
      where: { id },
    });
    return userById;
  };

  findByNickname = async (nickname) => {
    const userByNickname = await this.userModel.findAll({
      where: { nickname },
    });
    return userByNickname;
  };

  createUser = async (id, hashed, nickname, email, address) => {
    const userData = await this.userModel.create({
      id,
      password: hashed,
      nickname,
      email,
      address,
    });

    return userData;
  };

  getUserDataById = async (id) => {
    try {
      const userData = await this.userModel.findAll({ where: { id: id } });
      return userData;
    } catch (error) {
      error.status = 500;
      throw error;
    }
  };

  adminFindAllUsers = async () => {
    const users = await this.userModel.findAll();

    return users;
  };
}

module.exports = UserRepository;
