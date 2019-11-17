"use strict";
exports.__esModule = true;
var mysql = require("mysql");
var fs = require('fs');
var options = {
    flags: 'a',
    encoding: 'utf8'
};
var stdout = fs.createWriteStream('./stdout.log', options);
var stderr = fs.createWriteStream('./stderr.log', options);
// 创建logger
var logger = new console.Console(stdout, stderr);
var handleSqlErr = function (err) {
    if (err) {
        logger.error(err);
    }
};
var handleSqlResult = function (err, results, fields) {
    handleSqlErr(err);
    logger.log(results);
};
var connection = mysql.createConnection({
    host: '118.190.160.87',
    port: 3306,
    user: 'root',
    password: 'DD-Center',
    database: 'danmaku'
});
var createTable = function () {
    var sql = "\n        create table if not exists danmaku(\n        id varchar(50) unique not null primary key,\n        message varchar(100) not null,\n        room_id int unsigned not null,\n        mid int unsigned not null,\n        uname varchar(20) not null,\n        timestamp int8 unsigned not null\n        ) default charset utf8mb4\n    ";
    connection.query(sql, handleSqlResult);
};
exports.createTable = createTable;
var insertDanmaku = function (msg) {
    var sql = "insert into danmaku(id,message,room_id,mid,uname,timestamp) values(?,?,?,?,?,?)";
    var params = [msg.mid.toString() + msg.timestamp.toString(), msg.message, msg.roomid, msg.mid, msg.uname, msg.timestamp];
    connection.query(sql, params, handleSqlResult);
    logger.log(msg);
};
exports.insertDanmaku = insertDanmaku;
