import { Response , Request } from "express";
import { Router } from "express";
import * as ev from 'express-validator';
import { Usuario } from "../models/usuario";
import * as bc from 'bcryptjs';
const { downloadfile } = require('../helpers/movefiles');
const { validMaster:VM , correonorepetido } = require('../middlewares/validadores');
const _r = Router();

//CONTROLADORES:
const crearUsuario = async(req:Request,res:Response) => {
    try{
        let data:{correo:string,nick:string,pass:string,pic?:string} = {
            correo : req.body.correo,
            nick: req.body.nick,
            pass : bc.hashSync(req.body.pass,await bc.genSalt(5))
        }
        //Y aqui es donde viene la magia con la imagen:
        await downloadfile().then(async(resp:string) => {
            data.pic = resp;
            await new Usuario(data).save();
        }).catch(async(err:any) => {
            console.log('falla la descarga de imagen',err);
        });
        return res.status(200).send();
    }catch(err){return res.status(500).json(err)};
}

//RUTAS:
_r.post('/',[
    ev.body('correo').isEmail(),
    ev.body('correo').custom( correonorepetido ),
    ev.body('nick').not().isEmpty(),
    ev.body('pass').not().isEmpty(),
    VM
],crearUsuario);

//EXPORTACION DE LAS RUTAS:
module.exports = _r;


