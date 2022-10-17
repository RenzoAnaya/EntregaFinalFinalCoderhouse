import bycript from 'bcrypt'

const validPassword = async (password, userPassword) =>{
    return await bycript.compare(password, userPassword)
}

export default validPassword