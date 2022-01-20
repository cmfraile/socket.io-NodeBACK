import { UploadedFile } from "express-fileupload";
import { existsSync , unlinkSync } from 'fs';
import { v4 } from 'uuid';
import path from 'path';

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

module.exports = { uploadfile , delfile };