/**
 * Created by paul on 2/22/16.
 */

/* jshint node: true */
'use strict';
var Q = require('q');
var mysqlPool = require('../utils/mysql-connection-pool');
var Logger = require('../utils/log-manager').Logger;

//module.exports = {
//  findUserByUsername: findUserByUsername
//};

module.exports = User;

function User(username, hiddenPW, id, email, registrationData, state, firstname, lastname) {
  this.id = id;
  this.username = username;
  this.hiddenPW = hiddenPW;
  this.email = email;
  this.registrationData = registrationData;
  this.state = state;
  this.firstname = firstname;
  this.lastname = lastname;
  this._setUserAttributes = _setUserAttributes.bind(this);
}
/*
User.prototype.findById = function (id) {
  var self = this;
  var dfd = Q.defer();
  mysqlPool.getConnection(function (err, connection) {
    connection.query('SELECT * FROM users where id = ?', id, function (err, rows) {
      if (err) {
        Logger.error(err);
        dfd.reject({ status: 500, message: 'system internal error' });
      } else {
        if (rows.length === 0) {
          dfd.reject({ status: 400, message: 'cannot find the user' });
        } else {
          self._setUserAttributes(rows[0]);
          dfd.resolve(self);
        }
      }

      //don't forget to release the connection
      connection.release();
    });
  });
  return dfd.promise;
};

User.prototype.verifySelf = function () {
  var self = this;
  var dfd = Q.defer();
  mysqlPool.getConnection(function (err, connection) {
    connection.query('SELECT * FROM users where username = ?', self.username, function (err, rows) {
      if (err) {
        Logger.error(err);
        dfd.reject({ status: 500, message: 'system internal error' });
      } else {
        if (rows.length === 0) {
          dfd.reject({ status: 400, message: 'cannot find the username: ' + self.username });
        } else if (rows[0].hiddenPW !== self.hiddenPW) {
          dfd.reject({ status: 400, message: 'the hiddenPW is not correct!' });
        } else {
          self._setUserAttributes(rows[0]);
          dfd.resolve(self);
        }
      }

      //don't forget to release the connection
      connection.release();
    });
  });
  return dfd.promise;
};
*/
function _setUserAttributes(userTableFileds) {
  /*jshint validthis:true */
  this.id = userTableFileds.id;
  this.username = userTableFileds.username;
  this.hiddenPW = userTableFileds.hiddenPW;
  this.email = userTableFileds.email;
  this.registrationData = userTableFileds.reg_date;// jscs:disable
  this.state = userTableFileds.state;
  this.firstname = userTableFileds.firstname;
  this.lastname = userTableFileds.lastname;
}
