import dotenv from 'dotenv';
import Server from './models/server';

//Configurar dotenv.
dotenv.config();

export const server = new Server();

server.listen();