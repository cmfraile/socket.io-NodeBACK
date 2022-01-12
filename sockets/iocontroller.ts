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
    //socket.on('cts',(callback) => {console.log('SERVIDOR <<< CLIENTE');callback(v4())});
    socket.on('cts',() => {socket.emit('angular')});

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
        const nuevoticket = new Ticket({usuario:sinatender,creado:new Date(),llamado:null,agente:null}); nuevoticket.save();
        callback(nuevoticket);
    });
    socket.on('atenderticket',async({id,agente},callback) => {
        const atendido = await Ticket.findByIdAndUpdate(id,{agente,llamado:new Date()},{new:true});
        const [misconsulta] = await Misc.find();
        let { _id:idtabla , bdcopiasinatender:bdcsa , bdcopiatendido:bdca } = misconsulta;
        bdcsa.splice(bdcsa.indexOf(atendido.usuario),1)
        bdca.push(atendido.usuario);
        await Misc.findByIdAndUpdate(idtabla,{bdcopiasinatender:bdcsa,bdcopiatendido:bdca});
        callback(atendido);
        socket.emit('vuelta','LoremIpsumDolor')
    });
    socket.on('borrarticket',async(ticket:any) => {
        await Ticket.findByIdAndDelete(ticket._id);
        const [misconsulta] = await Misc.find();
        let { _id:idtabla , bdcopiasinatender:bdcsa , bdcopiatendido:bdca } = misconsulta;
        bdca.splice(bdca.indexOf(ticket.usuario),1);
        bdcsa.push(ticket.usuario);
        await Misc.findByIdAndUpdate(idtabla,{bdcopiasinatender:bdcsa,bdcopiatendido:bdca});
    });
}