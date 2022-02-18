import { Schema , model } from 'mongoose';
import { Socket , Server as _is } from 'socket.io';

interface usuario { correo:string , nick:string ,pass:string , pic:string };
const usuarioSchema = new Schema({
    correo:{type:String,required:true},
    nick:{type:String,required:true},
    pass:{type:String,required:true},
    pic:{type:String,required:true}
},{collection:'usuario'});export const Usuario = model<usuario>('usuario',usuarioSchema);

export class ConexionUsuario {
    
    private ios:_is;
    
    constructor(ios:_is){this.ios = ios};

    private conectados:string[] = [] ; public get getcon(){return this.conectados};
    public pokecon(socket:Socket,accion:string,usuario:string){

        const emision = () => {
            socket.emit('pokeperfil',this.conectados);
            socket.broadcast.emit('pokeperfil',this.conectados);
        }

        switch(accion){
            case 'conectar':this.conectados.push(usuario);emision();break;
            case 'desconectar':this.conectados.splice(this.conectados.indexOf(usuario),1);emision();break;
        };
    }

    private infoconectados:any[] = [] ; public get getic(){return this.conectados};


}