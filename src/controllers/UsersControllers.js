const User = require('../models/User');

module.exports = {
  async store(req, res) {
    const { google_id, name } = req.body;

    const user_in_db = await User.findOne({ google_id });
    if (user_in_db) {
      return res.json({ error: "Esse usuário já existe!" });
    }

    const user = await User.create({
      google_id,
      name
    });

    return res.json(user);
  }
}