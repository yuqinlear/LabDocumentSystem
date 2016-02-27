/**
 * Created by dingyi on 2/24/16.
 */
/* jshint node: true */
'use strict';

var express = require('express');
var fs = require('fs');
var inspect = require('util').inspect;
var Busboy = require('busboy');

var dest = __dirname + '/../users-upload/';
fs.access(dest, function (err) {
  console.log(err ? 'no access to ' + dest : 'can access ' + dest);
  if (err) {
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
          console.log('changing user to ' + val);
          dest += val + '/';
          fs.access(dest, function (err) {
            console.log(err ? 'no access!' : 'can read/write');
            if (err) {
              console.log('no access, making directory now!');
              fs.mkdir(dest);
            }
          });
        }
      });
      busboy.on('file', function (fieldname, file, filename, encoding, mimetype) {
        console.log('File [' + fieldname + ']: filename: ' + filename + ', encoding: ' + encoding);
        file.pipe(fs.createWriteStream(dest + filename));
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
