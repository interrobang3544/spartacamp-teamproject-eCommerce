const UserService = require('../services/users.service');

class UsersController {
  userService = new UserService();

  adminGetAllUsers = async (req, res, next) => {
    try {
      const usersInfo = await this.userService.adminFindAllUsers();
      return res.status(200).json({ data: usersInfo });
    } catch (error) {
      return res.status(400).json({
        errorMessage: '회원 정보 조회에 실패하였습니다.',
      });
    }
  };
}

module.exports = UsersController;
