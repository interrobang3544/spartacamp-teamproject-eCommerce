const UserRepository = require('../repositories/users.repository');
const { User } = require('../models');

class UserService {
  userRepository = new UserRepository(User);

  adminFindAllUsers = async () => {
    const users = await this.userRepository.adminFindAllUsers();
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
