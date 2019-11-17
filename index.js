"use strict";
exports.__esModule = true;
var sql_1 = require("./sql");
var danmakuWs_1 = require("./danmakuWs");
sql_1.createTable();
danmakuWs_1.startListen(sql_1.insertDanmaku);
