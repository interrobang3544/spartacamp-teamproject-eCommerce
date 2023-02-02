const UserRepository = require('../repositories/users.repository');
const { User } = require('../models');

class UserService {
  userRepository = new UserRepository(User);

  adminFindAllUsers = async (limit, offset) => {
    const users = await this.userRepository.adminFindAllUsers(limit, offset);
    // console.log(users);
    return users
    // return users.map((user) => {
    //   return {
    //     userId: user.userId,
    //     id: user.id,
    //     password: user.password,
    //     nickname: user.nickname,
    //     email: user.email,
    //     address: user.address,
    //     createdAt: user.createdAt,
    //     updatedAt: user.updatedAt,
    //   };
    // });
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
}

module.exports = UserService;
