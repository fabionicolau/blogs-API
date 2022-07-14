module.exports = (err, _req, res, _next) => {
  const { name, message } = err;
  switch (name) {
    case 'UserAlreadyExists':
      res.status(409).json({ message });
      break;
    default:
      res.status(400).json({ message });
      break;
  }
};