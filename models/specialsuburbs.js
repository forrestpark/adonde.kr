'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class specialsuburbs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.City, { foreignKey: 'sido_sgg' })
    }
  };
  specialsuburbs.init({
    sido_sgg: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    destinations: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
    },
  }, {
    sequelize,
    modelName: 'specialsuburbs',
  });
  return specialsuburbs;
};