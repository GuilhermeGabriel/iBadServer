const User = require('../models/User');
const Conversation = require('../models/Conversation');

module.exports = {
  async store(req, res) {
    const { google_id, owner_id, user_id, message } = req.body;

    const user_in_db = await User.findOne({ google_id });
    if (!user_in_db) {
      return res.status(404).json({ error: "Esse usuario não existe!" });
    }

    let conversation = await Conversation
      .findOne({ users: { $eq: [owner_id, user_id] } });

    if (!conversation) {
      conversation = await Conversation.create({
        users: [owner_id, user_id],
        messages: [],
      });
    }

    conversation.messages.push({
      message,
      user: user_in_db._id,
    });
    await conversation.save();

    return res.json(conversation);
  },
  async index(req, res) {
    const { google_id, owner_id, user_id, timestamp } = req.body;
    /*
        const messages = await Conversation
          .find({ users: { $eq: [owner_id, user_id] } })
          .order({timestamp:});*/

    return res.json(req.body);
  }
}