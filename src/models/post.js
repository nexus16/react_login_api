var mongoose = require('mongoose');

var schema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  username: {
    type: String,
    required: true,
    default: ''
  },

  title: {
    type: String,
    required: true,
    default: ''
  },

  content: {
    type: String,
    required: true,
    default: ''
  },
  image: {
    type: String,
    required: true,
    default: ''
  },
  likes: {
    type: Number,
    required: true,
    default: 0
  },
  comments: {
    type: Number,
    required: true,
    default: 0
  },
  bookmarks: {
    type: Number,
    required: true,
    default: 0
  },
  hashtags: {
    type: Array,
    required: true,
    default: [String]
  },
  liked: {
    type: Boolean,
    required: true,
    default: false
  },

  bookmarked: {
    type: Boolean,
    required: true,
    default: false
  },

  time: {
    type: Number,
    required: true,
    default: 0
  }
}, {
  timestamps: true
})
module.exports = mongoose.model('Post', schema);
