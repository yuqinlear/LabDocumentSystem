/**
 * Created by paul on 2/21/16.
 */
/* jshint node: true */
'use strict';

var express = require('express'),
  passport = require('passport'),
  User = require('../models/user'),
  LocalStrategy = require('passport-local').Strategy;

module.exports = userRouter;

function userRouter(app) {
  app.get('/api/users/', validAuth,
    function (req, res) {
      res.status(200).send('welcome !');
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

  app.post('/api/users/',
    function (req, res) {
      if (!req.body.username || !req.body.hiddenPW)  { // TODO: validate username
        res.status(400).send('invalid username !');
      }
      var theUser = new User(req.body.username, req.body.hiddenPW, req.body.email,
        req.body.firstname, req.body.lastname);
      theUser.save().then(
        function (user) {
          res.status(200).send({ message: 'registered successfully' });
        },
        function (err) {
          if (err.status === 400) {
            res.status(400).send({ message: err.message });
          } else {
            res.status(500).send('cannot create the user due to system internal error');
          }
        }
      );
    });

  app.get('/api/users/:username', validAuth,
    function (req, res) {
      res.status(200).send(req.user);
    });

  app.delete('/api/users/current-user/session', validAuth,
    function (req, res) {
      req.logout();
      req.session.destroy();
      res.status(200).send(req.user);
    });

}

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

function validAuth(req, res, next) {
  if (!req.isAuthenticated()) {
    res.sendStatus(401);
  } else {
    next();
  }
}
