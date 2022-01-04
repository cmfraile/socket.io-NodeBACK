import { connect as MonConnect, ConnectOptions } from "mongoose";
import axios from 'axios';
const mongoose = require('mongoose');

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
        axios.get('https://digimon-api.herokuapp.com/api/digimon').then(console.log);
    }catch(err){throw new Error(`${err}`)};
}

module.exports = { dbC , digidump };