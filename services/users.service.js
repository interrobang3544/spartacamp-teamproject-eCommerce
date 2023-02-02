const UserRepository = require('../repositories/users.repository');
const { User } = require('../models');

class UserService {
  userRepository = new UserRepository(User);

  getUserDataById = async (id) => {
    try {
      const userData = await this.userRepository.getUserDataById(id);

      if (userData.length < 1) {
        const error = new Error({ messaeg: '회원정보가 없습니다.' });
        throw error;
      }

      const user = userData.map((data) => {
        return {
          id: data.id,
          nickname: data.nickname,
          email: data.email,
          address: data.address,
        };
      });

      return user;
    } catch (error) {
      throw error;
    }
  };

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
