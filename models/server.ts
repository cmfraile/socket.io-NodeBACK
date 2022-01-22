import express , { Application } from 'express';
import { dbC } from '../db/configdb';
import cors , { CorsOptions } from 'cors';
import { createServer , Server as _hs } from 'http';
import { Server as _is } from 'socket.io';
import { fundamentoscallback } from '../sockets/iocontroller';
const { downloadfile:dF } = require('../helpers/movefiles');
import fs from 'fs';
import path from 'path';

class Server {

    private app:Application;
    private port:string;
    private coptions:CorsOptions = {origin:'*',methods:'*'};
    private httpserver:_hs;
    private ioserver:_is;
    private paths = {
        misc:'/api/',
        user:'/api/user/'
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
        this.testing();
    }

    middlewares(){
        this.app.use(express.json());
        this.app.use(cors());
        //this.app.use(express.static('public'));
    }

    routes(){
        this.app.use(this.paths.misc,require('../controllers/miscontroller'));
        this.app.use(this.paths.user,require('../controllers/usercontroller'));
        
        //creador de las carpetas de storage:
        if(!fs.existsSync(path.join(__dirname,'../db&storage'))){
            fs.mkdir(path.join(__dirname,'../db&storage'),(err) => {
                if(err == null){
                    fs.mkdir(path.join(__dirname,'../db&storage','/storage'),() => {});
                }
            });
        }else{fs.mkdir(path.join(__dirname,'../db&storage','/storage'),() => {});};

    }

    async conectarDB(){await dbC()};

    sockets(){
        this.ioserver.on('connection',fundamentoscallback);
    }

    async testing(){ if(0){await dF();} };

    listen(){
        this.httpserver.listen(this.port, () => {
            console.log(`CORRIENDO EN ${this.port}`);
        })
    }

}

export default Server;