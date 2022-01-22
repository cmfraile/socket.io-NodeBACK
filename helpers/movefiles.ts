import { UploadedFile } from "express-fileupload";
import { existsSync , unlinkSync , createWriteStream } from 'fs';
import { v4 } from 'uuid';
import path from 'path';
import axios from "axios";

//https://futurestud.io/tutorials/download-files-images-with-axios-in-node-js;

const downloadfile = async() => {
    const urlpicsum:string = 'https://picsum.photos/200';
    const nTEMP = `${v4()}.jpg`;
    const uP = path.join(__dirname,'../db&storage/storage',`${nTEMP}`);
    axios({url:urlpicsum,responseType:'stream'}).then((resp:any) => {
        new Promise((rs,rj) => {
            resp.data.pipe(createWriteStream(uP)).on('finish',() => {rs(nTEMP)}).on('error',(err:any) => {rj(err)});
        })
    })
}

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

module.exports = { uploadfile , delfile , downloadfile };
