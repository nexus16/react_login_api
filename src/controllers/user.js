const User = require("../models/user");
const brcypt = require("bcrypt");
const {uploader} = require('../helper/index');

exports.index = async function (req, res) {
  const users = await User.find({});
  console.log(req.user)
  res.status(200).json({users});
};

exports.show = async function (req, res) {
  try {
      const id = req.params.id;

      const user = await User.findById(id);

      if (!user) return res.status(401).json({message: 'User does not exist'});

      res.status(200).json({user});
  } catch (error) {
      res.status(500).json({message: error.message})
  }
};

exports.update = async function (req, res) {
  try {
      const update = req.body;
      const id = req.params.id;
      const userId = req.user._id;
      //Make sure the passed id is that of the logged in user
      if (userId.toString() !== id.toString()) return res.status(401).json({message: "Sorry, you don't have the permission to upd this data."});

      const user = await User.findByIdAndUpdate(id, {$set: update}, {new: true});

      //if there is no image, return success message
      if (!req.file) return res.status(200).json({user, message: 'User has been updated'});

      //Attempt to upload to cloudinary
      const result = await uploader(req);
      const user_ = await User.findByIdAndUpdate(id, {$set: {profileImage: result.url}}, {new: true});

      return res.status(200).json({user_, message: 'User has been updated'});
  } catch (error) {
      res.status(500).json({message: error.message});
  }
};