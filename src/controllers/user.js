const User = require("../models/user");
const brcypt = require("bcrypt");

exports.index = async function (req, res) {
  const users = await User.find({});
  res.status(200).json({users});
};

