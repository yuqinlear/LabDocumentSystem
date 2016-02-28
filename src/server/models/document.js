/**
 * Created by paul on 2/28/16.
 */

/* jshint node: true */

// jscs:disable requireCamelCaseOrUpperCaseIdentifiers
'use strict';
var Q = require('q');
var mysqlPool = require('../utils/mysql-connection-pool');
var Logger = require('../utils/log-manager').Logger;
var logger = new Logger();

module.exports = Document;

function Document(docName, username, createTime, length, docType, id) {
  this.id = id;
  this.username = username;
  this.docName = docName;
  this.createTime = createTime;
  this.docType = docType;
  this.length = length;
}

Document.prototype.save = function () {
  var self = this;
  var dfd = Q.defer();
  mysqlPool.getConnection(function (err, connection) {
    connection.query('INSERT INTO documents SET ?', self, function (err, result) {
      if (err) {
        logger.error(err);
        if (err.code === 'ER_DUP_ENTRY') {
          dfd.reject({ status: 400, message: 'the document is existed' });
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

Document.prototype.delete = function (docName) {
  var dfd = Q.defer();
  mysqlPool.getConnection(function (err, connection) {
    connection.query('DELETE from documents where docName = ?', docName, function (err, result) {
      if (err) {
        logger.error(err);
        dfd.reject({ status: 500, message: 'system internal error' });
      } else {
        dfd.resolve('deleted successfully');
      }

      //don't forget to release the connection
      connection.release();
    });
  });
  return dfd.promise;
};

Document.findDocByDocName = function (docName) {
  var dfd = Q.defer();
  mysqlPool.getConnection(function (err, connection) {
    connection.query('select * from documents where docName = ?', docName, function (err, rows) {
      if (err) {
        logger.error(err);
        dfd.reject({ status: 500, message: 'system internal error' });
      } else {
        dfd.resolve(rows);
      }

      //don't forget to release the connection
      connection.release();
    });
  });
  return dfd.promise;
};

Document.findDocsByUsername = function (uid) {
  var dfd = Q.defer();
  mysqlPool.getConnection(function (err, connection) {
    connection.query('select * from documents where uid = ?', uid, function (err, rows) {
      if (err) {
        logger.error(err);
        dfd.reject({ status: 500, message: 'system internal error' });
      } else {
        dfd.resolve(rows);
      }

      //don't forget to release the connection
      connection.release();
    });
  });
  return dfd.promise;
};
