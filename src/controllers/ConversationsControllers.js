const User = require('../models/User');
const Conversations = require('../models/Conversation');

module.exports = {
  async index(req, res) {
    const { google_id, timestamp } = req.body;

    const user_in_db = await User.findOne({ google_id });
    if (!user_in_db) {
      return res.status(404).json({ error: "Esse usuario não existe!" });
    }

    let conversations;
    if (timestamp) {
      conversations = await Conversations
        .find({
          users: { $in: [user_in_db._id] },
          createdAt: { $lt: new Date(timestamp) }
        })
        .sort({ createdAt: -1 })
        .limit(10);
    } else {
      conversations = await Conversations
        .find({ users: { $in: [user_in_db._id] } })
        .sort({ createdAt: -1 })
        .limit(10);
    }

    return res.json(conversations);
  }
}