import { Schema , model } from 'mongoose';

interface misc { bdoriginal:string[] , bdcopiasinservicio:string[] , bdcopiatendido:string[] }

const miscSchema = new Schema({
    bdoriginal:{type:Array<String>(),required:false},
    bdcopiasinservicio:{type:Array<String>(),required:false},
    bdcopiatendido:{type:Array<String>(),required:false}
},{collection:'misc'});const Misc = model<misc>('misc',miscSchema);

/*
adminSchema.methods.toJSON = function(){
    const { nombre } = this.toObject();
    return { nombre };
};
*/

export = Misc;