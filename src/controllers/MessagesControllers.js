const User = require('../models/User');
const Conversation = require('../models/Conversation');
const Message = require('../models/Message');

module.exports = {
  async store(req, res) {
    const { google_id, owner_id, user_id, message } = req.body;

    const owner_user_in_db = await User.findOne({ google_id });
    const other_user_in_db = await User.findOne({ _id: user_id });

    if (!owner_user_in_db || !other_user_in_db) {
      return res.status(404).json({ error: "Algum dos usuarios não existente!" });
    }

    let conversation = await Conversation
      .findOne({ users: { $eq: [owner_id, user_id] } });

    if (!conversation) {
      conversation = await Conversation.create({
        users: [owner_id, user_id]
      });
      /*
            await owner_user_in_db.conversations.push(conversation._id);
            owner_user_in_db.save();
      
            await other_user_in_db.conversations.push(conversation._id);
            other_user_in_db.save();*/
    }

    const messageAdded = await Message.create({
      conversation_id: conversation._id,
      owner_id: owner_user_in_db._id,
      message
    });

    return res.json(messageAdded);
  },
  async index(req, res) {
    const { google_id, conversation_id, timestamp } = req.body;

    const user_in_db = await User.findOne({ google_id });
    if (!user_in_db || !user_in_db.conversations.includes(conversation_id)) {
      return res.status(404).json({
        error: "Esse usuario não existe ou não pode acessar essa conversa!"
      });
    }

    let messages;
    if (timestamp) {
      messages = await Message
        .find({
          conversation_id,
          createdAt: { $lt: new Date(timestamp) }
        })
        .sort({ createdAt: -1 })
        .limit(10);
    } else {
      messages = await Message
        .find({
          conversation_id
        })
        .sort({ createdAt: -1 })
        .limit(10);
    }

    return res.json(messages);
  }
}