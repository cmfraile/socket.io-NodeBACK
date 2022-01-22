import { connect as MonConnect, ConnectOptions } from "mongoose";

/*db.createUser({
    user:'usuario',
    pwd:'usuario',
    roles:['readWrite']
})*/

const dbC = async() => {
    try{
        const options:ConnectOptions = {
            user:'usuario',
            pass:'usuario',
            dbName:'chat',
        }
        await MonConnect(`mongodb://localhost:27017/${options.dbName}`,options,() => {console.log});
        //console.log('Estamos correctamente conectados a la base de datos.')
    }catch(err){console.log(err);throw new Error('No se logro establecer la conexión')};
}

export { dbC }