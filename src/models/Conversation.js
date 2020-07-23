const { Schema, model } = require('mongoose');

const ConversationSchema = new Schema({
  users: [{
    type: String,
    required: true
  }]
}, {
  timestamps: true
});

module.exports = model('Conversation', ConversationSchema);
