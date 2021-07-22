'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Suburbs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Suburbs.init({
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    sido: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: 'compositeIndex',
    },
    sgg: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: 'compositeIndex',
    },
  }, {
    sequelize,
    tableName: 'suburbs',
    modelName: 'Suburbs',
  });
  return Suburbs;
};