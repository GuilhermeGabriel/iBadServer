const User = require('../models/User');
const Post = require('../models/Post');

module.exports = {
  async store(req, res) {
    const { google_id, postId } = req.body;
    let postModified;

    const user_in_db = await User.findOne({ google_id });
    if (!user_in_db) {
      return res.status(404).json({ error: "Esse usuario não existe" });
    }

    const userLiked = user_in_db.likedPosts.includes(postId) ? true : false;

    if (userLiked) {
      user_in_db.likedPosts.splice(user_in_db.likedPosts.indexOf(postId), 1);
      await user_in_db.save();

      postModified = await Post.findOneAndUpdate(
        { _id: postId },
        { $inc: { 'likes': -1 } });
    } else {
      user_in_db.likedPosts.push(postId);
      await user_in_db.save();

      postModified = await Post.findOneAndUpdate(
        { _id: postId },
        { $inc: { 'likes': 1 }, });
    }

    return res.json({ a: userLiked });
  }
}