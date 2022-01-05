import { connect as MonConnect, ConnectOptions } from "mongoose";
import axios from 'axios';
import { shuffle } from 'underscore';
//import { Misc , Ticket } from '../models/ticketsBD';
const { Misc , Ticket } = require('../models/ticketsBD');


const dbC = async() => {
    try{
        const options:ConnectOptions = {
            user:'usuario',
            pass:'usuario',
            dbName:'tickets',
        }
        await MonConnect(`mongodb://localhost:27017/${options.dbName}`,options,() => {console.log});
        //console.log('Estamos correctamente conectados a la base de datos.')
    }catch(err){console.log(err);throw new Error('No se logro establecer la conexión')};
}

const digidump = async() => {

    const consulta = async() => {
        return new Promise<string[]|[]> ((rs,rj) => {
             let digimonarray:string[] = [];
             axios.get('https://digimon-api.herokuapp.com/api/digimon').then(resp => {
             resp.data.forEach((x:any) => { digimonarray.push(x.name) });
             digimonarray.sort();
             rs(digimonarray);
             }).catch(rj);
         });
    }

    try{
        if(1){await Misc.deleteMany({})};
        const traerdata:any[] = await Misc.find();
        if(traerdata.length !== 1){
            await Misc.deleteMany({});
            let data = await consulta().then().catch(err => []);
            const insertar = await new Misc({bdoriginal:data.sort(),bdcopiasinservicio:shuffle(data)}).save() ; console.log(insertar);
        }else{
            let nuevobj:{id:string,bdo:string[],bdss:string[],bda?:string[]|[]} = {
                id:traerdata[0]._id,
                bdo:traerdata[0].bdoriginal,
                bdss:shuffle(traerdata[0].bdoriginal),
            }; nuevobj.bda = [nuevobj.bdss[0],nuevobj.bdss[1],nuevobj.bdss[2],nuevobj.bdss[3]] ;
            nuevobj.bda.forEach((x:string) => {
                const y = nuevobj.bdss;
                y.splice(y.indexOf(x),1);
            });
            const cambio = await Misc.findByIdAndUpdate(nuevobj.id,{
                bdcopiasinservicio:nuevobj.bdss,
                bdcopiatendido:nuevobj.bda
            },{new:true}) ; console.log(cambio);
        }
    }catch(err){throw new Error(`${err}`)}

}

export { dbC , digidump }