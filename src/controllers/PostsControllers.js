const Post = require('../models/Post');
const User = require('../models/User');

module.exports = {
  async store(req, res) {
    const { google_id, body, type, color } = req.body;

    const user_in_db = await User.findOne({ google_id });
    if (!user_in_db) {
      return res.status(404).json({ error: "Esse usuario não existe" });
    }

    const post = await Post.create({
      username: user_in_db.name,
      user_id_db_id: user_in_db._id,
      body,
      type,
      likes: 0,
      color
    })

    return res.json(post);
  },
  async index(req, res) {
    const { type, lastDateRaw } = req.query;
    const lastDate = lastDateRaw;

    if (lastDateRaw) {
      if (type === 'todos') {
        const posts = await Post
          .find({ createdAt: { $lt: new Date(lastDate) } })
          .sort({ createdAt: -1 })
          .limit(10);
        return res.json(posts);
      } else {
        const posts = await Post
          .find({
            type,
            createdAt: { $lt: new Date(lastDate) }
          })
          .sort({ createdAt: -1 })
          .limit(10);
        return res.json(posts);
      }
    } else {
      if (type === 'todos') {
        const posts = await Post
          .find({})
          .sort({ createdAt: -1 })
          .limit(10);
        return res.json(posts);
      } else {
        const posts = await Post
          .find({ type })
          .sort({ createdAt: -1 })
          .limit(10);
        return res.json(posts);
      }
    }
  }
}