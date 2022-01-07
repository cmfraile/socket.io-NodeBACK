import { Schema , model } from 'mongoose';

interface misc { bdoriginal:string[] , bdcopiasinservicio:string[] , bdcopiatendido:string[] }
const miscSchema = new Schema({
    bdoriginal:{type:Array<String>(),required:false},
    bdcopiasinservicio:{type:Array<String>(),required:false},
    bdcopiatendido:{type:Array<String>(),required:false}
},{collection:'misc'});const Misc = model<misc>('misc',miscSchema);

interface ticket {usuario:string,llamado:Date,atendido:Date}
const ticketSchema = new Schema({
    usuario:{type:String,required:true},
    llamado:{type:Date||null,required:false},
    atendido:{type:Date||null,required:false}
},{collection:'tickets'});const Ticket = model<ticket>('ticket',ticketSchema)

/*
adminSchema.methods.toJSON = function(){
    const { nombre } = this.toObject();
    return { nombre };
};
*/

module.exports = { Misc , Ticket }