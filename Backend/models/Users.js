const mongoose = require("mongoose");

const UsersSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide name of the user."],
  },
  username: String,
  email: {
    type: String,
    required: [true, "Please provide email."],
  },
  address: Object,
  phone: {
    type: String,
    required: [true, "Please provide email."],
    maxLength: [10, "max 10 digits are allowed"],
  },
  website: {
    type: String,
    required: [true, "Please provide website."],
  },
  company: Object,
});

module.exports=mongoose.model("users",UsersSchema)
