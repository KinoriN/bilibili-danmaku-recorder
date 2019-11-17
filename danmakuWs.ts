import * as io from 'socket.io-client';
import { Danmaku } from './danmaku';
const socket = io('https://api.vtbs.moe',{path:'/vds'});
export const startListen  = (callback:(msg:Danmaku)=>void) =>{
    socket.on('connect',()=>{
        socket.emit('join','all');
    })
    socket.on('danmaku',callback)
}