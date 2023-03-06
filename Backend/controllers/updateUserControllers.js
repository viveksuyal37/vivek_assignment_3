const Users = require("../models/Users");
const ErrorHandler = require("../utils/ErrorHandler");

updateUserControllers = async (req, res, next) => {
  try {
    const { name, email, phone, website } = req.body;

    if (!name || !email || !phone || !website) {
      return next(new ErrorHandler("Please provide mandatory fields!", 400));
    }

    const user = await Users.findOne({ _id: req.params.id });
    if (!user) {
      return next(new ErrorHandler("No user found", 404));
    }

    const updatedUser = await Users.findOneAndUpdate(
      { _id: req.params.id },
      { ...req.body }
    );

    const users = await Users.find();
    res.json({ sucess: true, updatedUser, users });
  } catch (err) {
    next(err);
  }
};

module.exports = updateUserControllers;
