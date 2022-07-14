'use strict';

const categoryModel = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING
    }
  }, {
    tableName: 'Categories',
    timestamps: false,
    underscored: false,
  });
  

  return Category;
}

module.exports = categoryModel;