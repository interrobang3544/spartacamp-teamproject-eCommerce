const UserRepository = require('../repositories/users.repository');
const { User } = require('../models');

class UserService {
  userRepository = new UserRepository(User);

  adminFindAllUsers = async (limit, offset) => {
    const users = await this.userRepository.adminFindAllUsers(limit, offset);

    return users;
  };

  adminFindUsersBySearchWord = async (searchWord) => {
    const users = await this.userRepository.adminFindUsersBySearchWord(
      searchWord
    );
    return users.map((user) => {
      return {
        userId: user.userId,
        id: user.id,
        password: user.password,
        nickname: user.nickname,
        email: user.email,
        address: user.address,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      };
    });
  };

  updateUser = async (userId, id, nickname, email, address) => {
    const findUser = await this.userRepository.findUserById(userId);
    if (!findUser) throw new Error("Review doesn't exist");

    await this.userRepository.updateUser(userId, id, nickname, email, address);

    const updateUser = await this.userRepository.findUserById(userId);

    return {
      userId: updateUser.userId,
      id: updateUser.id,
      nickname: updateUser.nickname,
      email: updateUser.email,
      address: updateUser.address,
      createdAt: updateUser.createdAt,
      updatedAt: updateUser.updatedAt,
    };
  };

  deleteUser = async (userId) => {
    const findUser = await this.userRepository.findUserById(userId);
    if (!findUser) throw new Error("Review doesn't exist");

    await this.userRepository.deleteUser(userId);

    return {
      userId: findUser.userId,
      id: findUser.id,
      password: findUser.password,
      nickname: findUser.nickname,
      email: findUser.email,
      address: findUser.address,
      createdAt: findUser.createdAt,
      updatedAt: findUser.updatedAt,
    };
  };
}

module.exports = UserService;
