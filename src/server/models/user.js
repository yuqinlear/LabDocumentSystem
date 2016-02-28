/**
 * Created by paul on 2/22/16.
 */

/* jshint node: true */

// jscs:disable requireCamelCaseOrUpperCaseIdentifiers
'use strict';
var Q = require('q');
var mysqlPool = require('../utils/mysql-connection-pool');
var Logger = require('../utils/log-manager').Logger;
var logger = new Logger();

module.exports = User;

function User(username, hiddenPW, email, firstname, lastname, reg_date, state, id) {
  this.id = id;
  this.username = username;
  this.hiddenPW = hiddenPW;
  this.email = email;
  this.reg_date = reg_date;
  this.state = state;
  this.firstname = firstname;
  this.lastname = lastname;
  this._setUserAttributes = _setUserAttributes.bind(this);
}

User.findById = function (id) {
  var dfd = Q.defer();
  mysqlPool.getConnection(function (err, connection) {
    connection.query('SELECT * FROM users where id = ?', id, function (err, rows) {
      if (err) {
        logger.error(err);
        dfd.reject({ status: 500, message: 'system internal error' });
      } else {
        if (rows.length === 0) {
          dfd.reject({ status: 400, message: 'cannot find the user' });
        } else {
          var newUser = new User();
          newUser._setUserAttributes(rows[0]);
          dfd.resolve(newUser);
        }
      }

      //don't forget to release the connection
      connection.release();
    });
  });
  return dfd.promise;
};

User.verify = function (username, hiddenPW) {
  var dfd = Q.defer();
  mysqlPool.getConnection(function (err, connection) {
    connection.query('SELECT * FROM users where username = ?', username, function (err, rows) {
      if (err) {
        logger.error(err);
        dfd.reject({ status: 500, message: 'system internal error' });
      } else {
        if (rows.length === 0) {
          dfd.reject({ status: 400, message: 'cannot find the username: ' + username });
        } else if (rows[0].hiddenPW !== hiddenPW) {
          dfd.reject({ status: 400, message: 'the hiddenPW is not correct!' });
        } else {
          var newUser = new User();
          newUser._setUserAttributes(rows[0]);
          dfd.resolve(newUser);
        }
      }

      //don't forget to release the connection
      connection.release();
    });
  });
  return dfd.promise;
};

User.prototype.save = function () {
  var self = this;
  var dfd = Q.defer();
  mysqlPool.getConnection(function (err, connection) {
    connection.query('INSERT INTO users SET ?', self, function (err, result) {
        if (err) {
          logger.error(err);
          if (err.code === 'ER_DUP_ENTRY') {
            dfd.reject({ status: 400, message: 'the given username is existed' });
          } else {
            dfd.reject({ status: 500, message: 'system internal error' });
          }
        } else {
          self.id = result.insertId;
          dfd.resolve(self);
        }

        //don't forget to release the connection
        connection.release();
      });
  });
  return dfd.promise;
};

function _setUserAttributes(userTableFileds) {
  /*jshint validthis:true */
  this.id = userTableFileds.id;
  this.username = userTableFileds.username;
  this.hiddenPW = userTableFileds.hiddenPW;
  this.email = userTableFileds.email;
  this.reg_date = userTableFileds.reg_date;
  this.state = userTableFileds.state;
  this.firstname = userTableFileds.firstname;
  this.lastname = userTableFileds.lastname;
}
