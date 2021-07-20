var express = require("express");
var app = express();
var port = process.env.PORT || 3001;
const mongoose = require("mongoose");
var cors = require('cors');
app.use(cors())
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/test-nodejs',
{useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }).then(() => {
  console.log("Connected !!!")
}).catch(err => {
  console.log(err);
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var routes = require('./api/route');
app.use(routes);

app.use(function(req, res) {
  res.status(404).send({url: req.originalUrl + ' not found'})
});

app.listen(port);

console.log('Server started on: ' + port);
