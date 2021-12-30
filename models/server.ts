import express , { Application } from 'express';

class Server {

    private app:Application;
    private port:string;

    constructor(){
        this.app = express();
        this.port = process.env.PORT || '8000';
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en puerto ${this.port}`);
            console.log("tsc --watch && nodemon dist/app.js &&");
        })
    }

}

export default Server;