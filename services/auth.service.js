const AuthRepository = require('../repositories/auth.repository');

const { User } = require('../models/index');

class AuthService {
  authRepository = new AuthRepository(User);

  findById = async (id) => {
    const userById = await this.authRepository.findById(id);
    console.log(userById);

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
    const userByNIckname = await this.authRepository.findByNickname(nickname);
    console.log(userByNIckname);

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
    const createUserData = await this.authRepository.createUser(
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
}

module.exports = AuthService;
