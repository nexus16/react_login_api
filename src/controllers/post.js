const express = require('express');
const Post = require('../models/post');
const {uploader} = require('../helper/index');


exports.index = async function (req, res) {
  const posts = await Post.find({});
  // res.status(200).send({ message: "Post api"});
  res.status(200).json({post});
};
exports.show = async function (req, res) {
  try {
      const id = req.params.id;

      const post = await Post.findById(id);

      if (!post) return res.status(401).json({message: 'post does not exist'});

      res.status(200).json({post});
  } catch (error) {
      res.status(500).json({message: error.message})
  }
};

exports.store = async (req, res) => {
  try {
    var user = req.user
    const imagePost = await uploader(req);
    var post = new Post({
      userId: user._id,
      username: user.username,
      title: req.body.title,
      content: req.body.content,
      image: imagePost.url,
      hashtags: []
    });
    await post.save();

    res.status(200).json({message: 'Created post: ' + post._id});

  } catch (error) {
      res.status(500).json({success: false, message: error.message})
  }
};

exports.update = async function (req, res) {
  try {
      const update = req.body;
      const id = req.params.id;
      const userId = req.user._id;
      //Make sure the passed id is that of the logged in user
      // if (userId.toString() !== id.toString()) return res.status(401).json({message: "Sorry, you don't have the permission to upd this data."});

      const post = await Post.findByIdAndUpdate(id, {$set: update}, {new: true});

      return res.status(200).json({post, message: 'post has been updated'});
  } catch (error) {
      res.status(500).json({message: error.message});
  }
};