const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('genres', { /* sin ID porque los generos de la API no tienen ID, y acá se hace por defecto */

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

  });
};