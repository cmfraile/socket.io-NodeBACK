import { v4 } from 'uuid';
import { Socket } from 'socket.io';
const { Misc , Ticket } = require('../models/ticketsBD');

export const sc1 = (socket:Socket) => {
    console.log("IN");
    socket.on('disconnect',() => {
        console.log("OUT");
    });
    socket.on('angularmsg',(msg,callback) => {
        //callback(v4());
        socket.emit('vueltamsg',msg.caja);
        //socket.broadcast.emit('vueltamsg','PIN');
    });
};

export const fundamentoscallback = (socket:Socket) => {
    console.log("IN - Fundamentos callback");
    socket.on('disconnect',() => { console.log("OUT - Fundamentos callback") });
    socket.on('angular',(msg,callback) => {console.log(msg);callback(v4())});
}

export const appcola = (socket:Socket) => {
    console.log("IN - Aplicacion de cola");
    socket.on('disconnect',() => {console.log("OUT - Aplicacion de cola")});
    /*PREGUNTEN LO QUE PREGUNTEN, ESTO FUNCIONA:
    socket.on('crearticket',async(msg,callback) => {
        const prueba = await Misc.find();
        console.log(prueba);
        callback(prueba);
    })*/
    socket.on('crearticket',async(callback) => {
        let [{ _id:id , bdcopiashuffle:bdcs , bdcopiasinatender:bdcsa }] = await Misc.find();
        const sinatender = bdcs.shift();
        bdcsa.push(sinatender);
        await Misc.findByIdAndUpdate(id,{bdcopiashuffle:bdcs,bdcopiasinatender:bdcsa});
        const nuevoticket = new Ticket({usuario:sinatender,llamado:null,agente:null}); nuevoticket.save();
        const consulta2 = await Misc.find() ; console.log(await Ticket.find());
        callback(nuevoticket);
    })
}