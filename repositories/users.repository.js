const sequelize = require("sequelize");
const Op = sequelize.Op;

class UserRepository {
  constructor(UserModel) {
    this.userModel = UserModel;
  }

  adminFindAllUsers = async () => {
    const users = await this.userModel.findAll();

    return users;
  };

  adminFindUsersBySearchWord = async (searchWord) => {
    const users = await this.userModel.findAll({
      where: {
        [Op.or]: [
          {
            id: {
              [Op.like]: '%' + searchWord + '%',
            },
          },
          {
            nickname: {
              [Op.like]: '%' + searchWord + '%',
            },
          },
          {
            email: {
              [Op.like]: '%' + searchWord + '%',
            },
          },
          {
            address: {
              [Op.like]: '%' + searchWord + '%',
            },
          },
        ],
      },
    });

    return users;
  };
}

module.exports = UserRepository;
