/**
 * Created by dingyi on 2/24/16.
 */
/* jshint node: true */
'use strict';

var express = require('express');
var fs = require('fs');
var inspect = require('util').inspect;
var Busboy = require('busboy');
var path = require('path');
var dest = global.projectPath + '/user_uploads/';

module.exports = fileUploadRouter;

function fileUploadRouter(app) {
  app.post('/api/users/pdf',
    function (req, res) {
      var busboy = new Busboy({ headers: req.headers });
      busboy.on('field', function (fieldname, val, fieldnameTruncated, valTruncated, encoding, mimetype) {
        //add user name to dest path
        //if (fieldname === 'name') {
        //  req.pathname = dest + val + '/';
        //}

      });
      busboy.on('file', function (fieldname, file, filename, encoding, mimetype) {
        var path = dest + req.user.username + '/';
        fs.access(path, function (err) {
          console.log(err ? 'no access!' : 'can read/write');
          if (err) {
            console.log('no access, making directory now!');
            fs.mkdir(path, function (err) {
              if (!err) {
                file.pipe(fs.createWriteStream(path + filename));
              } else {
                console.log('Error when making directory' + err);
              }
            });
          }else {
            file.pipe(fs.createWriteStream(req.pathname + filename));
          }
        });
      });
      busboy.on('finish', function () {
        res.writeHead(200, { Connection: 'close' });
        res.end('file upload is done!');
      });
      req.pipe(busboy);
    });

}
