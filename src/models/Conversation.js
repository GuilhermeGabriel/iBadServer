const { Schema, model } = require('mongoose');

const ConversationSchema = new Schema({
  users: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  messages: [{
    msg: {
      type: String,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  }, {
    timestamps: true
  }]
}, {
  timestamps: true
});

module.exports = model('Conversation', ConversationSchema);
