module.exports = (req, res, next, err) => {
  const { name, message } = err;
  switch (name) {
    case 'MissingTokenError':
      res.status(401).json({ message });
      break;
    case 'InvalidTokenError':
      res.status(401).json({ message });
      break;
    default:
      res.status(500).json({ message });
      break;
  }
};