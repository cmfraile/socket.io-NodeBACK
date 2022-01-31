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

module.exports = { validMaster , validRoute }