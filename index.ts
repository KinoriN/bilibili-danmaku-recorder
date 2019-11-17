import { createTable, insertDanmaku } from "./sql";
import { startListen } from "./danmakuWs";

createTable();
startListen(insertDanmaku);