import { connect as MonConnect, ConnectOptions } from "mongoose";
import axios from 'axios';
import Misc from '../models/ticketsBD';
import { Mongoose , Model } from "mongoose";

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
    try{
        await Misc.deleteMany({});
        Misc.find( (err,data) => {console.log(err,data)} );
        const consulta = async() => {
           return new Promise ((rs,rj) => {
                let digimonarray:string[] = [];
                axios.get('https://digimon-api.herokuapp.com/api/digimon').then(resp => {
                resp.data.forEach((x:any) => { digimonarray.push(x.name) });
                rs(digimonarray)
                }).catch(rj);
            });
        }
        const bdoriginal = await consulta();
        const insertado = new Misc({bdoriginal}) ; await insertado.save();
        Misc.find( (err,data) => {console.log(err,data)} );
    }catch(err){throw new Error(`${err}`)};
}

export { dbC , digidump }