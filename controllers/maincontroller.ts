import { Response , Request } from "express";
import { Router } from "express";
import * as ev from 'express-validator';
const _r = Router();

//CONTROLADORES:
const ping = async(req:Request,res:Response) => {
    try{
    console.log("llegas aqui");
    return res.status(200).json({msg:'Ping correcto'});
}catch(err){return res.status(500).json(err)}};

//RUTAS:
_r.get('/',ping);

//EXPORTACION DE LAS RUTAS:
module.exports = _r;


