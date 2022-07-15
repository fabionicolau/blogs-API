'use strict';

const postCategoryModel = (sequelize, DataTypes) => {
  const PostCategory = sequelize.define('PostCategory', {
    postId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      primaryKey: true,
      reference: {
        model: 'BlogPosts',
        key: 'id'
      }
    },
    categoryId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      primaryKey: true,
      reference: {
        model: 'Categories',
        key: 'id'
      }
    }
  }, {
    tableName: 'PostCategories',
    timestamps: false,
    underscored: false,
  });

  PostCategory.associate = (models) => {
    models.BlogPost.belongsToMany(models.Category, {
      through: models.PostCategory,
      foreignKey: 'postId',
      as: 'categories'
    });
    models.Category.belongsToMany(models.BlogPost, {
      through: models.PostCategory,
      foreignKey: 'categoryId',
      as: 'blogPosts'
    });
  }

  return PostCategory;
}

module.exports = postCategoryModel;