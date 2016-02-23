/**
 * Created by paul on 2/22/16.
 */

/* jshint node: true */
'use strict';
var Q = require('q');
var mysqlPool = require('../utils/mysql-connection-pool');

module.exports = {
  findUserByUsername: findUserByUsername
};

function findUserByUsername(username) {
  var dfd = Q.defer();
  mysqlPool.getConnection(function (err, connection) {
    connection.query('SELECT * FROM users where username = ?', username, function (err, rows) {
      if (err) {
        dfd.reject(err);
      } else {
        dfd.resolve(rows[0]);
      }

      //don't forget to release the connection
      connection.release();
    });
  });
  return dfd.promise;
}
