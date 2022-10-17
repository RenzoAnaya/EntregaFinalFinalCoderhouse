import mongoose from "mongoose";
import bycript from 'bcrypt'

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        require: true,
        lowercase: true,
        trim: true
    },
    password:{
        type: String,
        require: true,
        trim: true
    },
    fullname: {
        type: String,
        require:true, 
        trim: true
    },
    phone:{
        type: String,
        require: true,
        trim: true
    }
});

// hashear contraseña antes de guardar

userSchema.pre('save', async function (){
    const user = this;
    if(user.isModified('password')){
        user.password = await bycript.hash(user.password, 12);
    }
});

const User = mongoose.model('user', userSchema);
export default User;