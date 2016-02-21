/**
 * Created by paul on 2/21/16.
 */
/* jshint node: true */
'use strict';

var express = require('express'),
  passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy;

module.exports = userRouter;

function userRouter(app) {
  app.get('/api/users/', validAuth,
    function (req, res) {
      res.statusCode(200).send('welcome !');
    });

  app.post('/api/users/authenticate',
    function (req, res, next) {
      // PassportJs: when using a custom callback, it becomes the application's responsibility to establish a session
      // (by calling req.login())
      passport.authenticate('local', function (err, user, info) {
        if (err) {
          return res.status(500).json({ err: err });
        }
        if (!user) {
          return res.status(401).json({ err: info });
        }
        req.login(user, function (err) {
          if (err) {
            return res.status(500).json({ err: 'login failed' });
          }
          res.status(200).json({ status: 'Login successfully!' });
        });
      })(req, res, next);
    }
  );
}

passport.use(
  new LocalStrategy(
    function (username, password, done) {

      // if the user is valid, return done(null, true);
      return done(null, false);
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  //User.findById(id, function (err, user) {
  //  done(err, user);
  //});
});

function validAuth(req, res, next) {
  if (!req.isAuthenticated()) {
    res.send(401);
  } else {
    next();
  }
}
