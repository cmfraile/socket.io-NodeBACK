import express , { Application } from 'express';
import cors , {CorsOptions} from 'cors';
import { createServer , Server as _hs } from 'http';
import {Server as _is} from 'socket.io';

class Server {

    private app:Application;
    private port:string;
    private coptions:CorsOptions = {origin:'*',methods:'*'};
    private httpserver:_hs;
    private ioserver:_is;

    constructor(){
        this.app = express();
        this.port = process.env.PORT || '8000';
        this.httpserver = createServer(this.app);
        this.ioserver = new _is(this.httpserver,{cors:this.coptions});
        this.middlewares();
        this.sockets();
    }

    middlewares(){
        this.app.use(express.json());
        this.app.use(cors());
        //this.app.use(express.static('public'));
    }

    sockets(){
        this.ioserver.on('connection' , socket => {
            console.log("IN");
            socket.on('disconnect',() => {
                console.log("OUT");
            })
        })
    }

    listen(){
        this.httpserver.listen(this.port, () => {
            console.log(`CORRIENDO EN ${this.port}`);
        })
    }

}

export default Server;