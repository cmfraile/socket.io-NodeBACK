import express , { Application } from 'express';
import { dbC } from '../db/configdb';
import cors , { CorsOptions } from 'cors';
import { createServer , Server as _hs } from 'http';
import { Server as _is } from 'socket.io';
import { fundamentoscallback } from '../sockets/iocontroller';

class Server {

    private app:Application;
    private port:string;
    private coptions:CorsOptions = {origin:'*',methods:'*'};
    private httpserver:_hs;
    private ioserver:_is;
    private paths = {
        ping:'/api/'
    }

    constructor(){
        this.app = express();
        this.port = process.env.PORT || '8000';
        this.httpserver = createServer(this.app);
        this.ioserver = new _is(this.httpserver,{cors:this.coptions});
        this.middlewares();
        this.routes();
        this.conectarDB();
        this.sockets();
    }

    middlewares(){
        this.app.use(express.json());
        this.app.use(cors());
        //this.app.use(express.static('public'));
    }

    routes(){
        this.app.use(this.paths.ping,require('../controllers/maincontroller'));
    }

    async conectarDB(){await dbC()};

    sockets(){
        this.ioserver.on('connection',fundamentoscallback);
    }

    listen(){
        this.httpserver.listen(this.port, () => {
            console.log(`CORRIENDO EN ${this.port}`);
        })
    }

}

export default Server;