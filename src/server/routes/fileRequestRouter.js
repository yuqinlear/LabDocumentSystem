/**
 * Created by dingyi on 2/27/16.
 */
/* jshint node: true */
'use strict';

var express = require('express');
var fs = require('fs');
var path = require('path');
var appDir = path.dirname(require.main.filename);
var dest = appDir + '/../../user_uploads/';

module.exports = fileRequestRouter;

function fileRequestRouter(app) {
  app.get('/api/users/:username/files',
    function (req, res) {

      console.log('Reading from ' + dest + req.params.username);
      fs.readdir(dest + req.params.username, function (err, files) {
        console.log('err: ' + err);
        if (!err) {
          console.log(JSON.stringify(files));
          res.writeHead(200, { Connection: 'close' });
          res.end(JSON.stringify(files));
        }else {
          //TODO: need refinement
          res.writeHead(404, { Connection: 'close' });
          res.end(err);
        }

      });

    });

  app.get('/api/users/:username/files/:filename',
    function (req, res) {
      fs.readFile(dest + req.params.username + '/' + req.params.filename,
        function (err, data) {
          console.log(data);
          if (!err) {
            res.writeHead(200,
              { Connection: 'close',
                contentType: 'application/pdf',
                contentDisposition: 'attachment; filename=' + req.params.filename
              });
            res.end(data);
          }else {
            console.log('Error when sending files: ' + err);
            res.writeHead(404, { Connection: 'close' });
            res.end(err);
          }
        });
    });
}
