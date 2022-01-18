import { Schema , model } from 'mongoose';

/*
interface ticket {usuario:string,creado:Date,llamado:Date|null,agente:string|null};
const ticketSchema = new Schema({
    usuario:{type:String,required:true},
    creado:{type:Date,required:true},
    llamado:{type:Date||null,required:false},
    agente:{type:String||null,required:false}
},{collection:'tickets'});const Ticket = model<ticket>('ticket',ticketSchema)
adminSchema.methods.toJSON = function(){
    const { nombre } = this.toObject();
    return { nombre };
};
*/

//module.exports = { Ticket }