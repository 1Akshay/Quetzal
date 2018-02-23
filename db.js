var mysql = require('mysql');
var dbConfig = require('./config');

var connection = mysql.createConnection({
host     : dbConfig.db_url,
user     : dbConfig.user,
password : dbConfig.password,
database : dbConfig.databases
});

connection.connect(function(err) {
    if (err) throw err;
});

module.exports = connection;
