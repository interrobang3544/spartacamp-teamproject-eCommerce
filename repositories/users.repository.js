class UserRepository {
  constructor(UserModel) {
    this.userModel = UserModel;
  }

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
