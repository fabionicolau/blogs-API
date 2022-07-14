'use strict';

const userModel = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    displayName: {
      allowNull: false,
      type: DataTypes.STRING
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING
    },
    image: {
      allowNull: true,
      type: DataTypes.STRING
    },
  }, {
    tableName: 'Users',
    timestamps: false,
    underscored: false,
  });

  // User.associate = (models) => {
  //   User.hasMany(models.BlogPosts, { foreignKey: 'userId', as: 'BlogPosts' });
  // }

  return User;
}

module.exports = userModel;