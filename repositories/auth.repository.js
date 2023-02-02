class AuthRepository {
  constructor(Model) {
    this.Model = Model;
  }

  findById = async (id) => {
    const userById = await this.Model.findAll({
      where: { id },
    });
    return userById;
  };

  findByNickname = async (nickname) => {
    const userByNickname = await this.Model.findAll({
      where: { nickname },
    });
    return userByNickname;
  };

  createUser = async (id, hashed, nickname, email, address) => {
    const userData = await this.Model.create({
      id,
      password: hashed,
      nickname,
      email,
      address,
    });

    return userData;
  };
}

module.exports = AuthRepository;
