/**
 * Created by dingyi on 2/24/16.
 */
/* jshint node: true */
'use strict';

var fs = require('fs');
var Busboy = require('busboy');
var Q = require('q');
var Logger = require('../../utils/log-manager').Logger;
var logger = new Logger();
var fileSystemPath = global.projectPath + '/user_uploads/';

module.exports = {
  uploadFile: uploadFile,
  downloadFile: downloadFile
};

function uploadFile(req) {
  var dfd = Q.defer();
  var busboy = new Busboy({ headers: req.headers });
  busboy.on('field', function (fieldname, val, fieldnameTruncated, valTruncated, encoding, mimetype) {
    if (fieldname === 'name') { //TODO: validate docName;
      req.docName = val;
    }
  });

  busboy.on('file', function (fieldname, file, filename, encoding, mimetype) {
    var path = fileSystemPath + req.user.username + '/';
    fs.access(path, function (err) {
      logger.error(err ? 'no access!' : 'can read/write');
      if (err) {
        logger.log('no access, making directory now!');
        fs.mkdir(path, function (err) {
          if (!err) {
            file.pipe(fs.createWriteStream(path + filename));
          } else {
            logger.error(err);
            dfd.reject({ status: 500, message: 'cannot make user directory' });
          }
        });
      }else {
        file.pipe(fs.createWriteStream(req.pathname + filename));
      }
    });
  });

  busboy.on('error', function (err) {
    dfd.reject({ status: 500, message: 'saving file failed' });
  });

  busboy.on('finish', function () {
    dfd.resolve();
  });
  req.pipe(busboy);
  return dfd.promise;
}

function downloadFile(req) {

}
