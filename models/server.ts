import express , { Application } from 'express';
import { dbC } from '../db/configdb';
import cors , { CorsOptions } from 'cors';
import { createServer , Server as _hs } from 'http';
import { Server as _is } from 'socket.io';
import { fundamentoscallback } from '../sockets/iocontroller';
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
        //this.testing();
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

    async testing(){
        //vamos a comprobar si jwt.verify salta cuando el token esta expirado:
        //EFECTIVAMENTE . Verify tambien salta en caso de expiración:
        const { verify , decode } = require('jsonwebtoken');
        const { gJWT } = require('../helpers/gJWT');
        const {token} = await gJWT('loremipsumdolor');
        console.log({token,verify:verify(token,process.env.JWTKEY || ""),decode:decode(token)});
        setTimeout(() => {
            console.log(verify(token,process.env.JWTKEY || "", (err:any) => {
                const { name , message , expiredAt } = err;
                console.log({name,message,expiredAt});
            }))
        },10000);
        //desestructuracion al aplicar el object keys sobre el error. El undefined final es la salida negativa del verify.
    };

    listen(){
        this.httpserver.listen(this.port, () => {
            console.log(`CORRIENDO EN ${this.port}`);
        })
    }

}

export default Server;