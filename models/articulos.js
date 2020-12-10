'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class articulos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  articulos.init({
    titulo: DataTypes.STRING,
    descripcion: DataTypes.STRING,
    contenido: DataTypes.STRING,
    image: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'articulos',
  });
  return articulos;
};