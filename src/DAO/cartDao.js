import Carts from '../models/cartModel.js';

class cartDao {
    async getAll(query = {}) {
        try {
          return await Carts.find(query);
        } catch (error) {
          console.log(`Error al buscar los carritos en la db . ${error}`);
        }
      }
    
      async get(user) {
        try {
          return await Carts.findOne({ userEmail: user.email });
        } catch (error) {
          console.log(`Error al buscar el carrito en la db . ${error}`);
        }
      }
    
      async create(cartData) {
        try {
          return await Carts.create(cartData);
        } catch (error) {
          console.log(`Error al crear carrito en la db. ${error}`);
        }
      }
    
      async update(id, updatedProduct) {
        try {
          return await Carts.findByIdAndUpdate(id, updatedProduct);
        } catch (error) {
          console.log(`Error al actualizar el carrito en la db. ${error}`);
        }
      }
    
      async delete(id) {
        try {
          return await Carts.findByIdAndDelete(id);
        } catch (error) {
          console.log(`Error al borrar el carrito en la db . ${error}`);
        }
      }
}

export default new cartDao();
