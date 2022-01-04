import { Schema , model } from 'mongoose';

const usuarioSchema = new Schema({
    nombre:{type:String,required:true}
},{collection:'usuarios'});const Usuario = model('usuario',usuarioSchema);

const ticketSchema = new Schema({
    usuario:{type:String,required:true},
    solicitado:{type:Date,required:true},
    atendido:{type:Date,required:false},
},{collection:'tickets'});const Ticket = model('ticket',ticketSchema);

/*
adminSchema.methods.toJSON = function(){
    const { nombre } = this.toObject();
    return { nombre };
};
*/

module.exports = { Usuario , Ticket };