import { Schema , model } from 'mongoose';

interface usuario { correo:string , nick:string ,pass:string , pic:string };
const usuarioSchema = new Schema({
    correo:{type:String,required:true},
    nick:{type:String,required:true},
    pass:{type:String,required:true},
    pic:{type:String,required:true}
},{collection:'usuario'});export const Usuario = model<usuario>('usuario',usuarioSchema);