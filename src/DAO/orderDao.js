import Orders from '../models/orderModel.js'

class ordersDao{
    async getAll(query = {}) {
        try {
          return await Orders.find(query);
        } catch (error) {
          console.log(`Error al buscar las órdenes (Base de datos). ${error}`);
        }
      }
    
      async get(user) {
        try {
          return await Orders.findOne({ userEmail: user.email });
        } catch (error) {
          console.log(`Error al buscar producto (Base de datos). ${error}`);
        }
      }
    
      async create(orderData) {
        try {
          return await Orders.create(orderData);
        } catch (error) {
          console.log(`Error al crear producto (Base de datos). ${error}`);
        }
      }
    
      async update(id, updatedProduct) {
        try {
          return await Orders.findByIdAndUpdate(id, updatedProduct);
        } catch (error) {
          console.log(`Error al actualizar producto (Base de datos). ${error}`);
        }
      }
    
      async delete(id) {
        try {
          return await Orders.findByIdAndDelete(id);
        } catch (error) {
          console.log(`Error al borrar producto (Base de datos). ${error}`);
        }
      }
}

export default new ordersDao();