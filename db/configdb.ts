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
        const misc = await Misc.find() ; console.log(misc);
        /*
        axios.get('https://digimon-api.herokuapp.com/api/digimon').then(resp => {
            let digimonarray:string[] = [];
            resp.data.forEach((x:any) => { digimonarray.push(x.name) });
            console.log(digimonarray);
        });
        */
    }catch(err){throw new Error(`${err}`)};
}

export { dbC , digidump }