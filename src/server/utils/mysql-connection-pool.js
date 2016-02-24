/**
 * Created by paul on 2/23/16.
 */
/* jshint node: true */
'use strict';

var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'labDoc'
});

module.exports = pool;
