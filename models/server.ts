import express , { Application } from 'express';
import cors , {CorsOptions} from 'cors';

class Server {

    private app:Application;
    private port:string;
    private coptions:CorsOptions = {origin:['http://localhost:8000','http://localhost:4200']};

    constructor(){
        this.app = express();
        this.port = process.env.PORT || '8000';
        this.middlewares();
    }

    middlewares(){
        this.app.use(express.json());
        this.app.use(cors(this.coptions));
        this.app.use(express.static('public'));
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log(`CORRIENDO EN ${this.port}`);
        })
    }

}

export default Server;