const routeNotFoundMiddleware = (req, res) => {
  res.status(404).json(
    {
      error: 'Not found'
    }
  );
};

module.exports = routeNotFoundMiddleware;