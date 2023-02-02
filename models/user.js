<<<<<<< HEAD
'use strict';
const {
  Model
} = require('sequelize');
=======
"use strict";
const { Model } = require("sequelize");
>>>>>>> upstream/dev
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
<<<<<<< HEAD
  User.init({
    userId: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
    },
    id: {
      unique: true,
      type: DataTypes.STRING
    },
    password: DataTypes.STRING,
    nickname: {
      unique: true,
      type: DataTypes.STRING
    },
    email: DataTypes.STRING,
    address: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
=======
  User.init(
    {
      userId: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true,
      },
      id: {
        unique: true,
        type: DataTypes.STRING,
      },
      password: DataTypes.STRING,
      nickname: {
        unique: true,
        type: DataTypes.STRING,
      },
      email: DataTypes.STRING,
      address: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
>>>>>>> upstream/dev
