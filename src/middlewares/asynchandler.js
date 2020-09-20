const asynchandler = (func) => async (req, res, next) => {
  try {
    await func(req, res, next);
  } catch (error) {
    res.status(500).json({
      status: 'failed',
      errors: [{ msg: error.message }]
    });
  }
};
export default asynchandler;
