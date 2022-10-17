import Users from '../models/userModel.js'

export default async function isRegistered(req, res, next){
    const {email} = req.body;

    const exists = await Users.find({ email : email});
    if(exists.length){
        res.json({ error : 'El correo ingresado ya ha sido utilizado'})
        return;
    }
    next();
}