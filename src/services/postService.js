const jwt = require('jsonwebtoken');
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

      deletePostById: async (id, token) => {
        const userPost = await BlogPost.findByPk(id, { include:
          [
            { model: User, as: 'user', attributes: { exclude: ['password'] } },
          ],
        });
        const decoded = jwt.decode(token);
        if (!userPost) {
          const err = new Error('Post does not exist');
          err.name = 'PostDoesNotExist';
          throw err;
        }
        if (userPost.dataValues.userId !== decoded.data.id) {
          const err = new Error('Unauthorized user');
          err.name = 'UnauthorizedUser';
          throw err;
        }
        await BlogPost.destroy({ where: { id } });
      },
  };

  module.exports = postService;