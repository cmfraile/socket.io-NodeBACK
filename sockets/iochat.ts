import { Socket } from 'socket.io';
import { ConexionUsuario } from '../models/usuario';

export const iochat = (socket:Socket,cu:ConexionUsuario) => {
    
    console.log("CONECTADO",socket.id);
    new iofn(socket,cu);

}

class iofn {

    private idconexion:string|undefined;
    private socket:Socket;
    private ic:ConexionUsuario;
    
    constructor(socket:Socket,instanciaconexiones:ConexionUsuario){
        this.socket = socket;
        this.ic = instanciaconexiones;
        
        //Instanciamos todo el socketizado:
        this.estadousuarios();
        this.chatpublico();
        
        //Socket de desconexion al final:
        this.desconexion();
    }

    //Funcion que añade el socketizado del estado de los usuarios:
    private estadousuarios(){
        this.socket.on('conpoke',(cb) => {cb(this.ic.getcon)});
        this.socket.on('pokeperfil',() => {
            this.socket.emit('pokeperfil') ; this.socket.broadcast.emit('pokeperfil');
        });
        this.socket.on('conexion',async(msg:string) => {
            this.idconexion = msg;
            this.ic.pokecon(this.socket,'conectar',this.idconexion);
        });
    }

    private chatpublico(){
        this.socket.on('msgpublico',(msg:string) => {
            const mensaje = {id:this.idconexion,mensaje:msg};
            this.ic.msgpublico(this.socket,mensaje)
        })
    }
    
    //Funcion que añade el socketizado de desconexión:
    private desconexion(){
        this.socket.on('disconnect',() => {
            if(this.idconexion == undefined){return};
            console.log("DESCONECTADO",this.socket.id);
            this.ic.pokecon(this.socket,'desconectar',this.idconexion);
        });
    }

}