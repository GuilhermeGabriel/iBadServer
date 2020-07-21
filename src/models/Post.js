const { Schema, model } = require('mongoose');

const PostSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  user_id_db_id: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
    required: true,
  },
  color: {
    type: String,
    required: true,
  }
}, {
  timestamps: true
});

module.exports = model('Post', PostSchema);
