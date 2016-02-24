/**
 * Created by dingyi on 2/24/16.
 */
/* jshint node: true */
'use strict';

var express = require('express');

var fs = require('fs');
module.exports = fileUploadRouter;

function fileUploadRouter(app) {
  app.post('/pdfUpload',
  function (req, res) {
    console.log(req.files[0]);
    var desfile = __dirname + '/' + req.files[0].originalname;
    var response;
    fs.readFile(req.files[0].path, function (err, data) {
      fs.writeFile(desfile, data, function (err) {
        if (err) {
          console.log(err);
        }else {
          response = {
            message:'File uploaded successfully',
            filename:req.files[0].originalname
          };
        }
        console.log(response);
        res.end(JSON.stringify(response));
      });
    });
  }
  );

}

