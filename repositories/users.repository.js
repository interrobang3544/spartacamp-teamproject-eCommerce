const sequelize = require('sequelize');
const Op = sequelize.Op;

class UserRepository {
  constructor(UserModel) {
    this.userModel = UserModel;
  }

  adminFindAllUsers = async (limit, offset) => {
    const users = await this.userModel.findAndCountAll({
      raw: true,
      offset: offset,
      limit: limit,
      order: [['updatedAt', 'ASC']],
    });
    // console.log(users)
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

  findUserById = async (userId) => {
    const user = await this.userModel.findByPk(userId);
    return user;
  };

  updateUser = async (userId, id, nickname, email, address) => {
    const updateUserData = await this.userModel.update(
      {
        id,
        nickname,
        email,
        address,
      },
      { where: { userId } }
    );

    return updateUserData;
  };

  deleteUser = async (userId) => {
    const deleteUserData = await this.userModel.destroy({
      where: { userId },
    });

    return deleteUserData;
  };
}

module.exports = UserRepository;
