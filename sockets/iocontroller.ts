import { v4 } from 'uuid';
import { Socket } from 'socket.io';

export const sc1 = (socket:Socket) => {
    console.log("IN");
    socket.on('disconnect',() => {
        console.log("OUT");
    });
    socket.on('angularmsg',(msg,callback) => {
        //callback(v4());
        socket.emit('vueltamsg',msg.caja);
        //socket.broadcast.emit('vueltamsg','PIN');
    });
};

export const fundamentoscallback = (socket:Socket) => {
    console.log("IN - Fundamentos callback");
    socket.on('disconnect',() => { console.log("OUT - Fundamentos callback") });
    socket.on('angular',(msg,callback) => {console.log(msg);callback(v4())});
}

export const appcola = (socket:Socket) => {
    console.log("IN - Aplicacion de cola");
    socket.on('disconnect',() => {console.log("OUT - Aplicacion de cola")});
    socket.on('crearticket',(msg,callback) => {callback('vuelta')});
}