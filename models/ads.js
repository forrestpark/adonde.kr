'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Ad extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      console.log('logging models..\n\n')
      console.log(models)
      // define association here
      this.belongsTo(models.User, { foreignKey: 'userID' })
    }
  };
  Ad.init({
    id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    // userID: {
    //     type: DataTypes.INTEGER,
    // },
    comp_name: {
        type: DataTypes.STRING,
    },
    comp_email:{
        type: DataTypes.STRING,
    },
    subject: {
        type: DataTypes.STRING,
    },
    name:{
        type: DataTypes.STRING,
    },
    description:{
        type: DataTypes.STRING,
    },
    img:{
        type: DataTypes.STRING,
    },
    url:{
        type: DataTypes.STRING,
    },
    views: {
        type: DataTypes.INTEGER,
    },
  }, {
    sequelize,
    tableName: 'ads',
    modelName: 'Ad',
    timestamps: true,
  });
  return Ad;
};