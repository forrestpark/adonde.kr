'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Train extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Train.init({
    sido: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    sgg: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    destinations: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
    },
  }, {
    sequelize,
    tableName: 'trains',
    modelName: 'Train',
  });
  return Train;
};