import * as mysql from 'mysql';
import { Danmaku } from './danmaku';
let fs = require('fs');
 
let options = {
  flags: 'a',     // append模式
  encoding: 'utf8',  // utf8编码
};

let stdout = fs.createWriteStream('./stdout.log', options);
let stderr = fs.createWriteStream('./stderr.log', options);
 
// 创建logger
let logger = new console.Console(stdout, stderr);

const handleSqlErr = (err:mysql.MysqlError)=>{
    if (err){
        logger.error(err);
    }
}

const handleSqlResult:mysql.queryCallback = (err:mysql.MysqlError,results?:any,fields?:mysql.FieldInfo[])=>{
    handleSqlErr(err);
    logger.log(results);
}

const connection = mysql.createConnection({
    host:'118.190.160.87',
    port:3306,
    user:'root',
    password:'DD-Center',
    database:'danmaku'
});

const createTable = ()=>{
    const sql =`
        create table if not exists danmaku(
        id varchar(50) unique not null primary key,
        message varchar(100) not null,
        room_id int unsigned not null,
        mid int unsigned not null,
        uname varchar(20) not null,
        timestamp int8 unsigned not null
        ) default charset utf8mb4
    `;
    connection.query(sql,handleSqlResult)
}

const insertDanmaku = (msg:Danmaku)=>{
    const sql = `insert into danmaku(id,message,room_id,mid,uname,timestamp) values(${msg.mid.toString()+msg.timestamp.toString()},'${msg.message}',${msg.roomid},${msg.mid},'${msg.uname}',${msg.timestamp})`
    connection.query(sql,handleSqlResult);
    logger.log(msg);
}

export{
    createTable,
    insertDanmaku
}