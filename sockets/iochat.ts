import { Socket } from 'socket.io';
import { ConexionUsuario } from '../models/usuario';
import { Server as _is } from 'socket.io';
const conexiones = new ConexionUsuario;

export const iochat = (socket:Socket) => {
    
    console.log("CONECTADO",socket.id);
    
    let correoconexion:string|undefined;
    
    socket.on('conpoke',(callback) => {callback(conexiones.getcon)});
    socket.on('pokeperfil', () => { socket.emit('pokeperfil') ; socket.broadcast.emit('pokeperfil') } );
    socket.on('conexion',(msg:string) => {
        correoconexion = msg;
        conexiones.pokecon(socket,'conectar',correoconexion)
    })
    socket.on('disconnect',() => {
        console.log("DESCONECTADO",socket.id)
        conexiones.pokecon(socket,'desconectar',correoconexion = "");
    });

}