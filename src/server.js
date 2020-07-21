const express = require('express');
const app = express();
const cors = require('cors');

const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://gui:12345@cluster0.xxvrl.mongodb.net/ibad?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
})

const routes = require('./routes');

app.use(cors());
app.use(express.json());
app.use(routes);
app.listen(3333);
