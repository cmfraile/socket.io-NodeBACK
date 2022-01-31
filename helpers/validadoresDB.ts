import { NextFunction } from "express";
import { Usuario } from "../models/usuario";

const eMAIL = async(correo:string,next:NextFunction) => {
    const existe = await Usuario.find({correo});
    if(!existe){throw new Error('este usuario no existe')};
    next;
}

const correonorepetido = async(req:Request,res:Response,next:NextFunction) => {
    const correo = req;
    const existe:any[] = await Usuario.find({correo});
    if(existe.length){throw new Error('El correo ya esta en uso')}else{next};
}

const usuarioexiste = async(id:string,next:NextFunction) => {
    if(!id){throw new Error('no se esta recibiendo un ID valido')};
    const consulta = await Usuario.findById(id);
    //console.log(consulta);
    if(consulta){next}else{throw new Error('no se encuentra el usuario')}
}

module.exports = { eMAIL , usuarioexiste , correonorepetido }