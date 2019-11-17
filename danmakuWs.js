"use strict";
exports.__esModule = true;
var io = require("socket.io-client");
var socket = io('https://api.vtbs.moe', { path: '/vds' });
exports.startListen = function (callback) {
    socket.on('connect', function () {
        socket.emit('join', 'all');
    });
    socket.on('danmaku', callback);
};
