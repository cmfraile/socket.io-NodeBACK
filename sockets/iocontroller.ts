import { v4 } from 'uuid';
import { Socket } from 'socket.io';

export const sc1 = (socket:Socket) => {
    console.log("IN");
    socket.on('disconnect',() => {
        console.log("OUT");
    });
    socket.on('angularmsg',(msg,callback) => {
        console.log(msg);
        callback(v4());
        socket.emit('vueltamsg',msg.caja);
        socket.broadcast.emit('vueltamsg','PIN');
    });
};