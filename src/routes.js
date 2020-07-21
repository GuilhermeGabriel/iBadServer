const express = require('express');
const routes = express.Router();

const UsersControllers = require('./controllers/UsersControllers');
const PostsControllers = require('./controllers/PostsControllers');
const LikesControllers = require('./controllers/LikesController');
//const ConversationsControllers = require('./controllers/ConversationsControllers');

//Users
routes.post('/users', UsersControllers.store);

//Post
routes.get('/posts', PostsControllers.index);
routes.post('/posts', PostsControllers.store);

//Likes
routes.post('/posts/like', LikesControllers.store);

//Conversations
//routes.post('/conversation', ConversationsControllers.store);
//routes.post('/conversation/send/:idConversation', MessagesControllers.store);
//obter as msg

module.exports = routes;