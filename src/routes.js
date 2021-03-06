const express = require('express');
const routes = express.Router();

const UsersControllers = require('./controllers/UsersControllers');
const PostsControllers = require('./controllers/PostsControllers');
const LikesControllers = require('./controllers/LikesController');
const Conversations = require('./controllers/ConversationsControllers');
const MessagesControllers = require('./controllers/MessagesControllers');

//Test
routes.get('/test', (req, res) => {
  return res.json({ ok: true });
});

//Users
routes.post('/users', UsersControllers.store);

//Post
routes.get('/posts', PostsControllers.index);
routes.post('/posts', PostsControllers.store);

//Likes
routes.post('/posts/like', LikesControllers.store);

//Conversations
routes.get('/conversations', Conversations.index);

//Messages
routes.post('/messages', MessagesControllers.store);
routes.get('/messages', MessagesControllers.index);

module.exports = routes;