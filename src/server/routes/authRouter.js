/**
 * Created by paul on 3/5/16.
 */
/* jshint node: true */
'use strict';

var express = require('express'),
  passport = require('passport'),
  User = require('../models/user'),
  LocalStrategy = require('passport-local').Strategy;

var passport = require('passport'),
  FacebookStrategy = require('passport-facebook').Strategy;

module.exports = function (app) {
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

