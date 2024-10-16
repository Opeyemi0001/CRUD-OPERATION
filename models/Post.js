const mongoose = require('mongoose');

// Post schema
const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  body: {
    type: String,
    require: true

  },
  postImg: {
    type: String,
    default: "https://themarketingfolks.com/wp-content/uploads/2017/09/01-Social-Media.jpg"
  },
  category: String,
  tags: [String],
  likes: {
    type: Date,
    default: Date.now
  }
}, timestamp = true);

module.exports = mongoose.model('Post', postSchema);