import { Response , Request } from "express";
import { Router } from "express";
import * as ev from 'express-validator';
const { Ticket } = require('../models/ticketsBD')
const _r = Router();

//CONTROLADORES:
const ping = async(req:Request,res:Response) => {try{return res.status(200).send('Ping con servidor')}catch(err){return res.status(500).json(err)}};

const ticketget = async(req:Request,res:Response) => {
    try{
        return res.status(200).json(await Ticket.find());
    }catch(err){return res.status(500).json(err)}
}

//RUTAS:
//_r.get('/',ping);
_r.get('/',ticketget);

//EXPORTACION DE LAS RUTAS:
module.exports = _r;


