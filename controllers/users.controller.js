const UserService = require('../services/users.service');

class UsersController {
  userService = new UserService();

  adminGetAllUsers = async (req, res, next) => {
    console.log(req.query.page)
    try {
      let limit = 3;
      let offset = 0 + (req.query.page - 1) * limit;
      const usersInfo = await this.userService.adminFindAllUsers(limit, offset);
      // console.log(usersInfo)
      return res.status(200).json({ totalPage: Math.ceil(usersInfo.count / limit), data: usersInfo.rows });
    } catch (error) {
      return res.status(400).json({
        errorMessage: '회원 정보 조회에 실패하였습니다.',
      });
    }
  };

  adminGetUsersBySearchWord = async (req, res, next) => {
    const { searchword } = req.params;
    try {
      const usersInfo = await this.userService.adminFindUsersBySearchWord(searchword);
      return res.status(200).json({ data: usersInfo });
    } catch (error) {
      return res.status(400).json({
        errorMessage: '회원 정보 조회에 실패하였습니다.',
      });
    }
  };
}

module.exports = UsersController;
