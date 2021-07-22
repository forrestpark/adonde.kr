'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class traintest extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  traintest.init({
    depCity: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      primaryKey: true,
    },
    arrCity: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
    },
  }, {
    sequelize,
    modelName: 'traintest',
  });
  return traintest;
};