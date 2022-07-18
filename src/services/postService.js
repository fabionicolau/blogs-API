const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');
const Sequelize = require('sequelize');
const Joi = require('joi');
const config = require('../database/config/config');

const sequelize = new Sequelize(config.development);
const { BlogPost, User, Category, PostCategory } = require('../database/models');

const validateFields = async ({ title, content, categoryIds }) => {
  const schema = Joi.object({
    title: Joi.string().required(),
    content: Joi.string().required(),
    categoryIds: Joi.array().items(Joi.number()).required(),
  }).messages({
    'string.empty': 'Some required fields are missing',
  });

  const { error, value } = schema.validate({ title, content, categoryIds });
  if (error) throw error;
  return value;
};

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

      getPostByQuery: async (query) => {
        if (!query) return postService.getAllPostCategories();
        const post = await BlogPost.findAll({
          where: {
            [Op.or]: [
              { title: { [Op.substring]: query } },
              { content: { [Op.substring]: query } },
            ],
          },
          include: [
            { model: User, as: 'user', attributes: { exclude: ['password'] } },
            { model: Category, as: 'categories', through: { attributes: [] } },
          ],
        });
        if (!post) {
          return [];
        }
        return post;
      },

      createPost: async (token, { title, content, categoryIds }) => {
        await validateFields({ title, content, categoryIds });
        const t = await sequelize.transaction();
        try {
          const { data: { id } } = jwt.decode(token);
          const newPost = await BlogPost
          .create(
            { title, content, userId: id, categoryIds, published: new Date(), updated: new Date() },
            { transaction: t },
);
          
          await PostCategory.bulkCreate(categoryIds.map((categoryId) => ({
            postId: newPost.id, categoryId })), { transaction: t });

          await t.commit();
  
          return newPost;
        } catch (error) {
          t.rollback();
          console.log(error.message);
          throw error;
        }
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