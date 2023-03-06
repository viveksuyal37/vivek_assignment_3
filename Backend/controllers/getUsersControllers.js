const Users = require("../models/Users");
const ErrorHandler = require("../utils/ErrorHandler")

getUsersController = async (req, res, next) => {
  try {
    const users = await Users.find();
    if (!users || users.length === 0) {
      return next(new ErrorHandler("No user found", 404));
    }
    res.json({ success: true, users });
  } catch (err) {
    next(err);
  }
};

module.exports = getUsersController;
