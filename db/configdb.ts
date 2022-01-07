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
        //El delete Many genera nueva data y quitarlo hace que persista:
        //await Misc.deleteMany({});
        const consultaprimera = await Misc.find(); console.log(consultaprimera.length) ;
        if(consultaprimera.length == 0){
            await Misc.deleteMany({});
            const digidata = await consulta().then().catch(err => []);
            let newobj:any = {
                bdoriginal:digidata,
                bdcopiasinservicio:shuffle(digidata),
            } ; newobj.bdcopiatendido = [newobj.bdcopiasinservicio[0],newobj.bdcopiasinservicio[1],newobj.bdcopiasinservicio[2],newobj.bdcopiasinservicio[3]];
            newobj.bdcopiatendido.forEach((x:string) => {
                let y:string[] = newobj.bdcopiasinservicio;
                y.splice(y.indexOf(x),1);
            });
            await new Misc(newobj).save();
        };
        const anydata:any = await Misc.find() ; const data = anydata[0]; console.log(anydata);
    }catch(err){throw new Error(`${err}`)};

}

export { dbC , digidump }