/**
 * Created by paul on 2/5/16.
 */
/* jshint node:true */
'use strict';
var express = require('express');
var bodyParser = require('body-parser');
var timeout = require('connect-timeout');
var expressSession = require('express-session');
var _ = require('lodash');
var Logger = require('./utils/log-manager').Logger;
var app = express();

var port = process.env.PORT || 3000;

app.use(timeout(300000));
app.use(bodyParser.urlencoded({ extended: true, limit: '5mb' }));
app.use(bodyParser.json({ limit: '5mb' }));

app.use(expressSession({
  secret: 'labDoc_session_salt',
  cookie: { maxAge: 86400000 }, // 1 day
  resave: false,
  saveUninitialized: false
}));
app.use(function (req, res, next) {
  req.logger = new Logger({
    session: req.session
  });
  next();
});

app.get('/', function (req, res) {
  res.cookie('localhost', 'test: true', { maxAge:  365 * 86400000 }).send('This is a test API!');
});

app.listen(port, function () {
  console.log('the server is listening at port: ' + port);
});
