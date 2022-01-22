import { Response , Request } from "express";
import { Router } from "express";
import * as ev from 'express-validator';
import { Usuario } from '../models/usuario';
const _r = Router();

//CONTROLADORES:
const ping = async(req:Request,res:Response) => {
    try{
    console.log("llegas aqui");
    return res.status(200).json({msg:'Ping correcto'});
}catch(err){return res.status(500).json(err)}};

const crearUsuario = async(req:Request,res:Response) => {
    try{
        let data = {
            correo : req.body.correo,
            pass : req.body.pass
        }
        //Y aqui es donde viene la magia con la imagen:
    }catch(err){return res.status(500).json(err)};
}

//RUTAS:
_r.get('/',ping);

//EXPORTACION DE LAS RUTAS:
module.exports = _r;


