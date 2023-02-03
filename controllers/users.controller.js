const UserService = require('../services/users.service');
const bcrypt = require('bcrypt');

class UsersController {
  userService = new UserService();

  getUserData = async (req, res, next) => {
    try {
      const userId = res.locals.user.userId;
      const userData = await this.userService.getUserDataById(userId);
      return res.status(200).json({ data: userData });
    } catch (error) {
      return res.status(400).json({
        errorMessage: '회원 정보 조회에 실패하였습니다.',
      });
    }
  };

  changeUserData = async (req, res, next) => {
    try {
      const userId = res.locals.user.userId;
      const { password, nickname, email, address } = req.body;

      if (!password || !nickname || !email || !address) {
        return res.status(400).json({ message: '빈 값이 있습니다.' });
      }

      const foundByNickname = await this.userService.findByNickname(nickname);

      if (foundByNickname.length > 0) {
        return res
          .status(409)
          .json({ message: `${nickname}는 이미 존재하는 닉네임입니다.` });
      }

      const hashed = await bcrypt.hash(password, 12);

      const newUserData = await this.userService.changeUserData(
        userId,
        hashed,
        nickname,
        email,
        address
      );

      return res.status(201).json({
        message: '회원 정보 수정이 완료되었습니다.',
      });
    } catch (error) {
      console.log(error);
      return res
        .status(400)
        .json({ message: '회원 정보 수정에 실패하였습니다.' });
    }
  };

  adminGetAllUsers = async (req, res, next) => {
    console.log(req.query.page);
    try {
      let limit = 3;
      let offset = 0 + (req.query.page - 1) * limit;
      const usersInfo = await this.userService.adminFindAllUsers(limit, offset);
      // console.log(usersInfo)
      return res.status(200).json({
        totalPage: Math.ceil(usersInfo.count / limit),
        data: usersInfo.rows,
      });
    } catch (error) {
      return res.status(400).json({
        errorMessage: '회원 정보 조회에 실패하였습니다.',
      });
    }
  };

  adminGetUsersBySearchWord = async (req, res, next) => {
    const { searchword } = req.params;
    try {
      const usersInfo = await this.userService.adminFindUsersBySearchWord(
        searchword
      );
      return res.status(200).json({ data: usersInfo });
    } catch (error) {
      return res.status(400).json({
        errorMessage: '회원 정보 조회에 실패하였습니다.',
      });
    }
  };
}

module.exports = UsersController;
