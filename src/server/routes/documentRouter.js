/**
 * Created by paul on 2/28/16.
 */
/* jshint node: true */
'use strict';

var express = require('express'),
  Document = require('../models/document'),
  fileRequestHandler = require('./handlers/fileRequestHandler');

module.exports = documentRouter;

function documentRouter(app) {

  app.post('/api/documents/', validAuth, function (req, res) {  // we use multiform to fetch docName
    fileRequestHandler.uploadFile(req)

      //.then(
      //  function (data) {
      //    var newDocument = new Document(req.docName, req.user.username);
      //    return newDocument.save();
      //  })
      .then(
        function (data) {
          res.status(200).send({ message: 'save document successfully' });
        })
      .catch(
        function (err) {
          if (err.status === 400) {
            res.status(400).send({ message: 'cannot upload the document: ' + err.message });
          } else {
            res.status(500).send({ message: 'system internal failure' });
          }
        });
  });

  app.get('/api/documents/:docName', validAuth, function (req, res) {
    fileRequestHandler.downloadFile(req)
      .then();
  });
}

function validAuth(req, res, next) {
  //if (!req.isAuthenticated()) {
  //  res.sendStatus(401);
  //} else {
  //  next();
  //}

  next(); // uncomment for debug
}
