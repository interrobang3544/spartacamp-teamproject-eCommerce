const sequelize = require('sequelize');
const Op = sequelize.Op;

class UserRepository {
  constructor(UserModel) {
    this.userModel = UserModel;
  }

  findUserById = async (userId) => {
    const user = await this.userModel.findOne({
      where: {
        userId,
      },
    });
    return user;
  };
}

module.exports = UserRepository;
