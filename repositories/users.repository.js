const sequelize = require('sequelize');
const Op = sequelize.Op;

class UserRepository {
  constructor(UserModel) {
    this.userModel = UserModel;
  }

  findById = async (id) => {
    try {
      const userById = await this.userModel.findAll({
        where: { id },
      });
      return userById;
    } catch (error) {
      error.status = 500;
      throw error;
    }
  };

  findByNickname = async (nickname) => {
    try {
      const userByNickname = await this.userModel.findAll({
        where: { nickname },
      });
      return userByNickname;
    } catch (error) {
      error.status = 500;
      throw error;
    }
  };

  createUser = async (id, hashed, nickname, email, address) => {
    try {
      const userData = await this.userModel.create({
        id,
        password: hashed,
        nickname,
        email,
        address,
      });

      return userData;
    } catch (error) {
      error.status = 500;
      throw error;
    }
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
      order: [['createdAt', 'DESC']],
    });
    // console.log(users)
    return users;
  };

  adminFindUsersBySearchWord = async (limit, offset, searchWord) => {
    const users = await this.userModel.findAndCountAll({
      raw: true,
      offset: offset,
      limit: limit,
      order: [['createdAt', 'DESC']],
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

  updateUser = async (userId, id, nickname, email, address, type) => {
    const updateUserData = await this.userModel.update(
      {
        id,
        nickname,
        email,
        address,
        type,
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
