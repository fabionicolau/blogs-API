const { BlogPost, User, Category } = require('../database/models');

const postService = {
  getAllPostCategories: async () => {
    const postCategories = await BlogPost.findAll({ include:
      [
        { model: User, as: 'user', attributes: { exclude: ['password'] } },
        { model: Category, as: 'categories', through: { attributes: [] } },
      ],
    });
    
    return postCategories;
    },

    getPostById: async (id) => {
      const post = await BlogPost.findByPk(id, { include:
        [
          { model: User, as: 'user', attributes: { exclude: ['password'] } },
          { model: Category, as: 'categories', through: { attributes: [] } },
        ],
      });
      
      return post;
      },
  };

  module.exports = postService;