import { NextFunction, Request , Response } from 'express';
import { validationResult } from 'express-validator';
import { validate } from 'uuid';
import { Usuario } from '../models/usuario';
import * as fs from 'fs';
import path from 'path';

const validMaster = (req:Request,res:Response,next:NextFunction) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){return res.status(400).json(errors)};
    next();
}

const validRoute = (req:Request,res:Response,next:NextFunction) => {
    const { ruta } = req.params;
    if(!validate(ruta.split('.')[0])){return res.status(400).send("la ruta de la imagen no es correcta")};
    const pathimg = path.join(__dirname,'../db&storage/storage',ruta);
    if(fs.existsSync(pathimg)){req.body.ruta = pathimg}else{req.body.ruta = undefined};
    next();
}

const correonorepetido = async(req:Request,res:Response,next:NextFunction) => {
    const { correo } = req.body ; const usuariomod:any = Usuario;
    const existe:number = await usuariomod.find({correo}).length;
    console.log(existe);
    if(existe){return res.status(400).json({correousado:true})}else{next};
}

module.exports = { validMaster , validRoute , correonorepetido }