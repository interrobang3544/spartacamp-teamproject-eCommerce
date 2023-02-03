const sequelize = require('sequelize');
const Op = sequelize.Op;

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

  getUserDataById = async (userId) => {
    try {
      const userData = await this.userModel.findAll({ where: { userId } });
      return userData;
    } catch (error) {
      error.status = 500;
      throw error;
    }
  };

  changeUserData = async (userId, hashed, nickname, email, address) => {
    try {
      const newUserData = await this.userModel.update(
        {
          password: hashed,
          nickname: nickname,
          email: email,
          address: address,
        },
        { where: { userId } }
      );
      return newUserData;
    } catch (error) {
      error.status = 500;
      throw error;
    }
  };

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
}

module.exports = UserRepository;
