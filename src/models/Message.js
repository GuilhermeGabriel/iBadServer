const { Schema, model } = require('mongoose');

const MessageSchema = new Schema({
  conversation_id: {
    type: String,
    required: true,
  },
  owner_id: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

module.exports = model('Message', MessageSchema);
