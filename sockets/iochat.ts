import { v4 } from 'uuid';
import { Socket } from 'socket.io';
import { ConexionUsuario } from '../models/usuario';

const conexiones = new ConexionUsuario;
export const iochat = (socket:Socket) => {
    const tc = (msg:any) => { return socket.emit('2c',msg) };
    console.log('CONECTADO');
    socket.on('disconnect',() => console.log('DESCONECTADO'));
    tc(conexiones.traerusuario(socket.id));
}