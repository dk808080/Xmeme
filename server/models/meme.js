const mongoose = require("mongoose");

const memeSchema = new mongoose.Schema({
  id: String,
  name: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  caption: {
    type: String,
    required: true,
  },
  likeCount: {
    type: Number,
    default: 0,
  },
  date: String,
});

const MemePost = new mongoose.model("MemePost", memeSchema);

module.exports = MemePost;
