const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const postsRoutes = require("./routes/posts");

const app = express();

/** Connect NodeJs with MongoDB */
mongoose
  // .connect('mongodb+srv://hai:mos13949@cluster0-b9sgf.mongodb.net/test?retryWrites=true')
  .connect('mongodb://hai:mos13949@cluster0-shard-00-00-b9sgf.mongodb.net:27017,cluster0-shard-00-01-b9sgf.mongodb.net:27017,cluster0-shard-00-02-b9sgf.mongodb.net:27017/node-angular?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true')
  .then(() => {
    console.log('connected to DB')
  })
  .catch((e) => {
    console.log(e)
    console.log('failed to connect to DB')
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

/** This is call as middleware */
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS"
  );
  next();
})

app.use('/api/posts', postsRoutes);

module.exports = app

