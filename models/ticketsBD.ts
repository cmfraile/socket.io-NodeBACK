import { Schema , model } from 'mongoose';

const miscSchema = new Schema({
    bdoriginal:{type:Array<String>()},
    bdcopiasinservicio:{type:Array<String>()},
    bdcopiatendido:{type:Array<String>()}
},{collection:'misc'});const Misc = model('misc',miscSchema);

/*
adminSchema.methods.toJSON = function(){
    const { nombre } = this.toObject();
    return { nombre };
};
*/

export = { Misc }