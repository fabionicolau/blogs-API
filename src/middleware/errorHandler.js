module.exports = (err, _req, res, _next) => {
  const { name, message } = err;
  switch (name) {
    case 'MissingFieldsError':
      res.status(400).json({ message });
      break;
    case 'InvalidFieldsError':
      res.status(400).json({ message });
      break;
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