import mongoose from 'mongoose';
import 'dotenv/config';



const config ={
    mongoDB:{
        URL:`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@proyectocoder.vxdbvs6.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
        options:{
            useNewUrlParser:true, 
            useUnifiedTopology: true
        }
    }
}

export const conectarDB = async () =>{
    try{
        await mongoose.connect(config.mongoDB.URL, config.mongoDB.options)
        console.log('Conectado a la base de datos')
    }catch(error){
        console.log('Error en la conexion a la BD', error);
    }
}