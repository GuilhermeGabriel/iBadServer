const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
  google_id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true,
  },
  conversations: [{
    type: Schema.Types.ObjectId,
    ref: 'Conversation',
  }],
  posts: [{
    type: Schema.Types.ObjectId,
    ref: 'Post',
  }],
  likedPosts: [{
    type: Schema.Types.ObjectId,
    ref: 'Post'
  }]
}, {
  timestamps: true,
});

module.exports = model('User', UserSchema);
