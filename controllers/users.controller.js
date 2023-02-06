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
        return res.status(400).json({ errorMessage: '빈 값이 있습니다.' });
      }

      // 비밀번호: 영어대소문자숫자
      const passwordCheck = /^[A-Za-z0-9]{3,}$/;
      // 닉네임:한글포함영어대소문자숫자
      const nicknameCheck = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|]+$/;
      // 이메일: aaa@aaa.aaa
      const emailCheck = /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
      if (
        !passwordCheck.test(password) ||
        !nicknameCheck.test(nickname) ||
        !emailCheck.test(email)
      ) {
        return res.status(412).json({
          errorMessage: '형식이 올바르지 않습니다. 다시 확인해주세요.',
        });
      }

      const foundByUserId = await this.userService.findByUserId(userId);
      if (nickname !== foundByUserId[0]['nickname']) {
        const foundByNickname = await this.userService.findByNickname(nickname);

        if (foundByNickname.length > 0) {
          return res.status(409).json({
            errorMessage: `${nickname}는 이미 존재하는 닉네임입니다.`,
          });
        }
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
        .json({ errorMessage: '회원 정보 수정에 실패하였습니다.' });
    }
  };

  adminGetAllUsers = async (req, res, next) => {
    try {
      let limit = 5;
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
      let limit = 5;
      let offset = 0 + (req.query.page - 1) * limit;
      const usersInfo = await this.userService.adminFindUsersBySearchWord(
        limit,
        offset,
        searchword
      );
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

  adminUpdateUser = async (req, res, next) => {
    const { userId } = req.params;
    const { id, nickname, email, address } = req.body;
    const updateUser = await this.userService.updateUser(
      userId,
      id,
      nickname,
      email,
      address
    );

    res.status(200).json({ data: updateUser });
  };

  adminDeleteUser = async (req, res, next) => {
    const { userId } = req.params;
    const deleteUser = await this.userService.deleteUser(userId);

    res.status(200).json({ data: deleteUser });
  };
}

module.exports = UsersController;
