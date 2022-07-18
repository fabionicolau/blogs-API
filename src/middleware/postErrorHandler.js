module.exports = (err, _req, res, _next) => {
  const { name, message } = err;
  switch (name) {
    case 'PostDoesNotExist':
      res.status(404).json({ message });
      break;
    case 'UnauthorizedUser':
      res.status(401).json({ message });
      break;
    case 'ValidationError':
      res.status(400).json({ message });
      break; 
    default:
      res.status(500).json({ message });
      break;
  }
};