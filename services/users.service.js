const UserRepository = require('../repositories/users.repository');
const { User } = require('../models');

class UserService {
  userRepository = new UserRepository(User);

  findById = async (id) => {
    const userById = await this.userRepository.findById(id);

    return userById.map((user) => {
      return {
        id: user.id,
        password: user.password,
        nickname: user.nickname,
        email: user.email,
        address: user.address,
      };
    });
  };

  findByNickname = async (nickname) => {
    const userByNIckname = await this.userRepository.findByNickname(nickname);

    // 얘는 다 불러와 줄 필요는 없음
    return userByNIckname.map((user) => {
      return {
        id: user.id,
        password: user.password,
        nickname: user.nickname,
        email: user.email,
        address: user.address,
      };
    });
  };

  createUser = async (id, hashed, nickname, email, address) => {
    const createUserData = await this.userRepository.createUser(
      id,
      hashed,
      nickname,
      email,
      address
    );

    return {
      id: createUserData.id,
      password: createUserData.password,
      nickname: createUserData.nickname,
      email: createUserData.email,
      address: createUserData.address,
    };
  };

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

  adminFindAllUsers = async (limit, offset) => {
    const users = await this.userRepository.adminFindAllUsers(limit, offset);

    return users
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
