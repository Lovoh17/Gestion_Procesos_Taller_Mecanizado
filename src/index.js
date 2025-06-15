import app  from "./app.js";
import { sequelize } from "./shared/database/database.js";
import dotenv from 'dotenv';

if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

import './shared/database/Associations.js'

const PORT = process.env.PORT || 3000;

async function main(){
    try{
        await sequelize.sync({force: true});
        console.log('Conectado a la BD');
        app.listen(PORT);
        console.log(`Servidor escuchando en el puerto ${PORT}`);
    }catch(error){
        console.error('Error en la conexion a la BD', error);
    }
}

main();