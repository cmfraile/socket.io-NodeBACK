import { Schema , model } from 'mongoose';
import { Socket , Server as _is } from 'socket.io';
import axios from 'axios';

interface usuario { correo:string , nick:string ,pass:string , pic:string };
const usuarioSchema = new Schema({
    correo:{type:String,required:true},
    nick:{type:String,required:true},
    pass:{type:String,required:true},
    pic:{type:String,required:true}
},{collection:'usuario'});export const Usuario = model<usuario>('usuario',usuarioSchema);

export class ConexionUsuario {
    
    private ios:_is;
    
    constructor(ios:_is){
        this.ios = ios;
    };

    private conectados:any[] = [] ; public get getcon(){return this.conectados};
    public async pokecon(socket:Socket,accion:string,usuario:string){

        const emision = () => {
            socket.emit('pokeperfil',this.conectados);
            socket.broadcast.emit('pokeperfil',this.conectados);
        }

        const devuelveusuario = async() => {
            return new Promise<void>(async(rs,rj) => {
                axios.get(`http://localhost:8000/api/user/${usuario}`).then((resp:any) => {
                const fulldata = {id:usuario,nick:resp.data.nick,pic:resp.data.pic};
                console.log(fulldata);
                this.conectados.push(fulldata);
                rs();
            }).catch(rj);
            })
        }

        switch(accion){
            case 'conectar':
                await devuelveusuario().then(emision);
                break;
            case 'desconectar':this.conectados.splice(this.conectados.indexOf(usuario),1);emision();break;
        };
    
    }

    private mensajes:any[] = [] ; public get getmsg(){return this.mensajes};
    public msgpublico(socket:Socket,msg:any){
        const { id , mensaje } = msg ;

        
    }



}