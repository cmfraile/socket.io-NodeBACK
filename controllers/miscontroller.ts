import { Response , Request } from "express";
import { Router } from "express";
import * as ev from 'express-validator';
import { Usuario } from '../models/usuario';
const { validMaster:VM , validRoute } = require('../middlewares/validadores');
const _r = Router();

const dumbcall:string = `${process.env.ENVIROMENT}/api/gdp/`

//CONTROLADORES:
const ping = async(req:Request,res:Response) => {
    try{
    return res.status(200).json({msg:'Ping correcto'});
}catch(err){return res.status(500).json(err)}};

const dumbpic = async(req:Request,res:Response) => {
    try {
        const rutafichero = req.body.ruta;
        if(rutafichero == undefined){return};
        res.sendFile(rutafichero);
    } catch(err){return res.status(500).json(err)};
}

//RUTAS:
_r.get('/',ping);
_r.get('/gdp/:ruta',[
    ev.param('ruta').not().isEmpty(),
    validRoute,
    VM
],dumbpic);

//EXPORTACION DE LAS RUTAS:
module.exports = _r;

//http://localhost:8000/api/gdp/bcf39c79-3a89-4c92-a675-edc514281c1a.jpg