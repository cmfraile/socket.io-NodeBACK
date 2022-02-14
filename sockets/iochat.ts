import { v4 } from 'uuid';
import { Socket } from 'socket.io';
import { ConexionUsuario } from '../models/usuario';
import { indexOf } from 'underscore';

const conexiones = new ConexionUsuario;
export const iochat = (socket:Socket) => {
    console.log("CONECTADO");
    
    let correoconexion:string|undefined;
    
    socket.on('conectados',(msg:string|undefined,callback) => {
        if(msg){correoconexion = msg ; conexiones.conectados.push(msg)};
        callback(conexiones.conectados);
    });
    socket.on('disconnect',() => {
        console.log("DESCONECTADO");
        if(correoconexion){conexiones.conectados.splice(conexiones.conectados.indexOf(correoconexion || ""),1)};
    });

}