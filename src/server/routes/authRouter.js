/**
 * Created by paul on 3/5/16.
 */
/* jshint node: true */
'use strict';

var express = require('express'),
  passport = require('passport'),
  User = require('../models/user'),
  LocalStrategy = require('passport-local').Strategy,
  FacebookStrategy = require('passport-facebook').Strategy;

module.exports = function (app) {

  //TODO: refactor each strategy as a module into their own files

  //local strategy
  app.post('/api/auth/local',
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

  passport.use(
    new LocalStrategy({
        usernameField: 'username',
        passwordField: 'hiddenPW'
      },
      function (username, hiddenPW, done) {
        User.verify(username, hiddenPW).then(
          function (user) {
            return done(null, user);
          },
          function (err) {
            if (err.status === 500) {
              return done(err, false, err.message);
            } else {
              return done(null, false, err.message);
            }
          }
        );

        //return done(null, { id: 2 }); // uncomment this line for debug;
      }
    )
  );

  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    //return done(null, {});  // uncomment this line for debug;
    User.findById(id).then(
      function (user) {
        return done(null, user);
      },
      function (err) {
        err.message += '/n This user might be removed from the system!';
        if (err.status === 500) {
          return done(err, false, err.message);
        } else {
          return done(null, false, err.message);
        }
      }
    );
  });

  // facebook strategy
  passport.use(new FacebookStrategy({
      clientID: '1676410812625941',
      clientSecret: '60b364b884a27a611d83677d3697bf07',
      callbackURL: 'http://68.175.63.186:3000/api/auth/facebook/callback'
    },
    function (accessToken, refreshToken, profile, done) {
      //User.findOrCreate(..., function(err, user) {
      //  if (err) { return done(err); }
      //    done(null, user);
      //});
      done(null, { id: 'testUserID' });
    }
  ));

  app.get('/api/auth/facebook', passport.authenticate('facebook'));

  app.get('/api/auth/facebook/callback',
    passport.authenticate('facebook',
      {
        successRedirect: '/index.html#/',
        failureRedirect: '/index.html#/login' }
    ));

};

