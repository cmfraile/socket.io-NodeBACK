import { Response , Request } from "express";
import { Router } from "express";
import * as ev from 'express-validator';
import { Usuario } from "../models/usuario";
import * as bc from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
const { downloadfile } = require('../helpers/movefiles');
const { validMaster:VM } = require('../middlewares/validadores');
const { eMAIL , usuarioexiste , correonorepetido } = require('../helpers/validadoresDB')
const _r = Router();
const { gJWT } = require('../helpers/gJWT');

const dumbcall:string = `${process.env.ENVIROMENT}/api/gdp/`

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

const getUsuarios = async(req:Request,res:Response) => {
    try{
        const bd = await Usuario.find();
        let consulta:any[] = [];
        bd.forEach((x:any) => {
            const { _id , correo , nick , pass , pic , __v } = x;
            consulta.push({
                correo,nick,
                pic : `${dumbcall}${pic}`
            });
        });
        return res.status(200).json(consulta);
    }catch(err){return res.status(500).json(err)};
}

const getUsuarioSingular = async(req:Request,res:Response) => {
    try{
        const consulta:any = await Usuario.findById(req.params.id);
        return res.status(200).json({nick:consulta.nick , pic:`${dumbcall}${consulta.pic}`})
    }catch(err){return res.status(500).json(err)};
}

const login = async(req:Request,res:Response) => {
    try{
        const data = {correo : req.body.correo,pass : req.body.pass};
        const b1 = await Usuario.findOne({correo:data.correo});
        if(!b1){return res.status(400).send('El correo no esta registrado en el sistema')};
        const b2 = bc.compareSync(data.pass,b1.pass);
        if(!b2){return res.status(400).send('la contraseña no es correcta')};
        const {token,expiracion} = await gJWT(b1._id);
        return res.status(200).json({token,expiracion,iduser:b1._id});
    }catch(err){return res.status(500).json(err)};
}

const guard = async(req:Request,res:Response) => {
    try{
        const tokentest = req.body.tokentest;
        console.log(jwt.decode(tokentest));
    }catch(err){return res.status(500).json(err)};
}

//RUTAS:
_r.get('/',getUsuarios);

_r.get('/:id',[
    ev.param('id').custom( usuarioexiste ),
    VM
],getUsuarioSingular);

_r.post('/',[
    ev.body('correo').isEmail(),
    ev.body('correo').custom( correonorepetido ),
    ev.body('nick').not().isEmpty(),
    ev.body('pass').not().isEmpty(),
    VM
],crearUsuario);

_r.post('/login',[
    ev.body('correo').isEmail(),
    ev.body('correo').custom( eMAIL ),
    ev.body('pass').notEmpty(),
    VM
],login)

//EXPORTACION DE LAS RUTAS:
module.exports = _r;


