/**
 * Created by dingyi on 2/24/16.
 */
/* jshint node: true */
'use strict';

var express = require('express');
var fs = require('fs');
module.exports = fileUploadRouter;

function fileUploadRouter(app) {
  app.post('/api/user/pdf',
  function (req, res) {
    console.log('receiving...');

    //console.log(req.upload);
    var pdf = req.body.upload;
    var desfile = __dirname + '/uploaded-pdf';

    fs.writeFile('upload', pdf, 'base64', function (err) {
      console.log(err);
    });
  });

}

