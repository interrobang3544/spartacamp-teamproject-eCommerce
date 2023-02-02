
class UserRepository {
  constructor(UserModel) {
    this.userModel = UserModel;
  }

  adminFindAllUsers = async () => {
    const users = await this.userModel.findAll();

    return users;
  };
}

module.exports = UserRepository;
