import * as jwt from 'jsonwebtoken';

const gJWT = (id:string = "") => {
    let eis:any=process.env.EXPIRE || '0' ; eis = parseInt(eis);
    return new Promise((rs,rj) => {
        const secreto:string = process.env.JWTKEY || "";
        if(secreto == ""){throw new Error('fallo la extraer la clave de las variables de entorno')};
        const payload = { id };
        jwt.sign(payload,secreto,{expiresIn:eis},(err,token:any) => {
            if(err){rj('no se pudo generar el token')} else {rs({token,expiracion:eis})};
        })
    })
}

module.exports = { gJWT };