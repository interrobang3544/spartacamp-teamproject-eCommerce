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
  class Order extends Model {
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
  Order.init({
    orderId: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
    },
    userId: DataTypes.INTEGER,
    request: DataTypes.STRING,
    address: DataTypes.STRING,
    quantity: DataTypes.INTEGER,
    productId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};
=======
  Order.init(
    {
      orderId: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true,
      },
      userId: DataTypes.INTEGER,
      request: DataTypes.STRING,
      address: DataTypes.STRING,
      quantity: DataTypes.INTEGER,
      productId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Order",
    }
  );
  return Order;
};
>>>>>>> upstream/dev
