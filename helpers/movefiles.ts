import { UploadedFile } from "express-fileupload";
import { existsSync , unlinkSync } from 'fs';
import { v4 } from 'uuid';
import path from 'path';
<<<<<<< HEAD
import { Axios } from 'axios';
import fs from 'fs';

//https://futurestud.io/tutorials/download-files-images-with-axios-in-node-js;

const downloadfile = async() => {
    const urlpicsum:string = 'https://picsum.photos/200';
    //const nTEMP = `${v4()}.${extension}`;
    const nTEMP = `${v4()}.jpg`;
    const uP = path.join(__dirname,'../db&storage/storage',nTEMP);
    const writer = fs.createWriteStream(uP);
    const response:any = await new Axios({ url:urlpicsum , method:'GET' , responseType:'stream' });
    response.data.pipe(writer);
    return new Promise((rs,rj) => {writer.on('finish',rs) ; writer.on('error',rj)})
}
=======
>>>>>>> bd57d860c62c7dd973f509a6afe985f9ee980530

const uploadfile = (fichero:UploadedFile) => {
    return new Promise((rs,rj) => {
        const eValidas = ['png','jpg','jpeg']
        const extension = fichero.name.split('.')[fichero.name.split('.').length - 1];
        const nTEMP = `${v4()}.${extension}`;
        const uP = path.join(__dirname,'../db&storage/storage',nTEMP);
        if(!eValidas.includes(extension)){return rj(`La extensión ${extension} no esta permitida`)};
        fichero.mv(uP,(err) => {
            if(err){rj(err)};
            rs(nTEMP);
        })
    });
}

const delfile = (place:string) => {
    return new Promise((rs,rj) => {
        const uP:string = path.join(__dirname,'../db&storage/storage',place);
        if(existsSync(uP)){rs(unlinkSync(uP))};
    });
}

<<<<<<< HEAD
module.exports = { uploadfile , delfile , downloadfile };
=======
module.exports = { uploadfile , delfile };
>>>>>>> bd57d860c62c7dd973f509a6afe985f9ee980530
