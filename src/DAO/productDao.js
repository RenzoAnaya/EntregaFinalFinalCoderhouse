import Products from '../models/productModel.js';
import User from '../models/userModel.js';

class productsDao {
    async getAll(query = {}){
        try{
            return await Products.find(query)
        }catch(error){
            console.log(`Error al buscar lo productos (Base de datos).  ${error}`)
        }
    }

    async getByCategory(category){
        try{
            return await Products.find({category})
        }catch(error){
            console.log(`Error al buscar los productos por categoria (Base de datos). ${error}`)
        }
    }

    async get(id){
        try{
            return await Products.findById(id)
        }catch(error){
            console.log(`No se pudo encontrar el producto (Base de datos). ${error}`)
        }
    }

    async create(product){
        try{
            return await Products.create(product)
        }catch(error){
            console.log(`Error al crear el producto (Base de datos). ${error}`)
        }
    }

    async update(id, updateProduct){
        try{
            return await Products.findByIdAndUpdate(id, updateProduct)
        }catch(error){
            console.log(`No se pudo actualizar el producto (Base de datos). ${error}`)
        }
    }

    async delete(id){
        try{
            return await Products.findByIdAndDelete(id)
        }catch(error){
            console.log(`No se pudo eliminar el producto (Base de datos). ${error}`)
        }
    }

    async addProductCart(productId, quantity, userId){
        const user = await User.findOne({ _id: userId });
         console.log(user);
         const productToAdd = {
         product: productId,
         quantity,
         };
         user.cart.push(productToAdd);
         user.save();
    }
}

export default new productsDao();