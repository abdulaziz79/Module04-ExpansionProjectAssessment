'use strict';
import { Model } from "sequelize";
export default (sequelize, DataTypes) => {
  class produts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  produts.init({
    title: DataTypes.STRING,
    category: DataTypes.STRING,
    description: DataTypes.STRING,
    price: DataTypes.STRING,
    supplier: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'produts',
  });
  return produts;
};