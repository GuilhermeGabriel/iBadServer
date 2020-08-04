const express = require('express');
const app = express();
const cors = require('cors');

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});

const routes = require('./routes');

app.use(cors());
app.use(express.json());
app.use(routes);
app.listen(3333);
