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

const digidump = async(nuke:boolean) => {

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
        if(nuke){await Misc.deleteMany({}) ; await Ticket.deleteMany({})};
        
        const consultaprimera = await Misc.find();
        if(consultaprimera.length == 0){
            const digidata = await consulta().then().catch(err => []);
            let newobj:any = {
                bdoriginal:digidata,
                bdcopiashuffle:shuffle(digidata),
                bdcopiasinatender:[],
                bdcopiatendido:[]
            };
            await new Misc(newobj).save();
        };
        
        /*Para comprobar que la data persiste:
        const anydata:any = await Misc.find(); const boleta:any = await Ticket.find();
        const data = anydata[0];
        console.log(data);*/
       
    }catch(err){throw new Error(`${err}`)};

}

export { dbC , digidump }