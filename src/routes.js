const express = require('express');
const routes = express.Router();

const UsersControllers = require('./controllers/UsersControllers');
const PostsControllers = require('./controllers/PostsControllers');
const LikesControllers = require('./controllers/LikesController');
const MessagesControllers = require('./controllers/MessagesControllers');

//Users
routes.post('/users', UsersControllers.store);

//Post
routes.get('/posts', PostsControllers.index);
routes.post('/posts', PostsControllers.store);

//Likes
routes.post('/posts/like', LikesControllers.store);

//Messages
routes.post('/messages', MessagesControllers.store);
routes.get('/messages', MessagesControllers.index);

module.exports = routes;