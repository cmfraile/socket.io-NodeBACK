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
        
        //Switch para generar nueva data. ON para generarla, OFF para que persista la anterior:
        if(0){await Misc.deleteMany({}) ; await Ticket.deleteMany({})};
        
        const consultaprimera = await Misc.find();
        if(consultaprimera.length == 0){
            const digidata = await consulta().then().catch(err => []);
            let newobj:any = {
                bdoriginal:digidata,
                bdcopiasinservicio:shuffle(digidata),
            } ; newobj.bdcopiatendido = [newobj.bdcopiasinservicio[0],newobj.bdcopiasinservicio[1],newobj.bdcopiasinservicio[2]];
            newobj.bdcopiatendido.forEach((x:string) => {
                let y:string[] = newobj.bdcopiasinservicio;
                y.splice(y.indexOf(x),1);
            });
            await new Misc(newobj).save();
            newobj.bdcopiatendido.forEach( async(x:string) => {
                await new Ticket({usuario:x,llamado:null,agente:null}).save();
            });
        };
        
        //Para comprobar que la data persiste:
        /*
        const anydata:any = await Misc.find(); const boleta:any = await Ticket.find();
        const data = anydata[0];
        console.log(anydata[0].bdcopiatendido,'\n',boleta);
        */
       
    }catch(err){throw new Error(`${err}`)};

}

export { dbC , digidump }