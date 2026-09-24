const errorMiddleware = (error, req, res, next) => {
  console.error(error);

  res.status(error.status || 500).json({
    message: error.status ? error.message : 'Internal server error',
  });
};

export default errorMiddleware;