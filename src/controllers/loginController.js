const loginService = require('../services/loginService');

const login = async (req, res) => {
  const token = await loginService.validateFields(req.body);
  res.status(200).send({ token });
};

module.exports = {
  login,
};