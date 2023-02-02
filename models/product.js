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
  class Product extends Model {
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
  Product.init({
    productId: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
    },
    productName: DataTypes.STRING,
    productExp: DataTypes.STRING,
    price: DataTypes.INTEGER,
    productPhoto: DataTypes.STRING,
    quantity: DataTypes.INTEGER,
    userCount: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};
=======
  Product.init(
    {
      productId: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true,
      },
      productName: DataTypes.STRING,
      productExp: DataTypes.STRING,
      price: DataTypes.INTEGER,
      productPhoto: DataTypes.STRING,
      quantity: DataTypes.INTEGER,
      userCount: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Product",
    }
  );
  return Product;
};
>>>>>>> upstream/dev
