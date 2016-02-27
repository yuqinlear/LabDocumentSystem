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
var appDir = path.dirname(require.main.filename);
var dest = appDir + '/user_uploads/';

fs.access(dest, function (err) {
  console.log(err ? 'no access to ' + dest : 'can access ' + dest);
  if (err) {
    console.log('Creating upload directory' + dest);
    fs.mkdirSync(dest);
  }
});
module.exports = fileUploadRouter;

function fileUploadRouter(app) {
  app.post('/api/user/pdf',
    function (req, res) {
      var busboy = new Busboy({ headers: req.headers });
      busboy.on('field', function (fieldname, val, fieldnameTruncated, valTruncated, encoding, mimetype) {
        console.log('Field [' + fieldname + ']: value: ' + val);

        //add user name to dest path
        if (fieldname === 'name') {
          req.pathname = dest + val + '/';
        }

      });
      busboy.on('file', function (fieldname, file, filename, encoding, mimetype) {
        console.log('File [' + fieldname + ']: filename: ' + filename + ', encoding: ' + encoding);
        console.log('changing user path to ' + req.pathname);

        //add user name to dest path
        fs.access(req.pathname, function (err) {
          console.log(err ? 'no access!' : 'can read/write');
          if (err) {
            console.log('no access, making directory now!');
            fs.mkdir(req.pathname, function (err) {
              if (!err) {
                file.pipe(fs.createWriteStream(req.pathname + filename));
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
        res.end("That's all folks!");
      });
      req.pipe(busboy);

      /*
      var fstream;
      req.pipe(req.busboy);
      req.busboy.on('file', function (fieldname, file, filename) {
        console.log('fieldname: ' + fieldname);
        console.log('Uploading: ' + filename);
        fstream = fs.createWriteStream(__dirname + '/uploads/' + filename);
        file.pipe(fstream);
        fstream.on('close', function () {
          res.redirect('back');
        });
      });
    });
*/
    });

}
