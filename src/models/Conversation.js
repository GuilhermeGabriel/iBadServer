const { Schema, model } = require('mongoose');

const ConversationSchema = new Schema({
  users: [{
    type: String,
    required: true
  }],
  messages: [{
    message: {
      type: String,
      required: true,
    },
    user: {
      type: String,
      required: true,
    },
    timestamp: {
      type: Date,
      default: Date.now
    }
  }]
}, {
  timestamps: true
});

module.exports = model('Conversation', ConversationSchema);
