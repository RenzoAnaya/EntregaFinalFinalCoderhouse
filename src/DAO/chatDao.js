import Chat from '../models/chatModel.js';

class chatDao {
    constructor (){}

    async listAll() {
        try {
          return await Chat.find();
        } catch (error) {
          throw new Error(`Error al mostrar chat: ${error}`);
        }
      }
    
      async listByEmail(email) {
        try {
          return await Chat.find({ email: email });
        } catch (error) {
          throw new Error(`Error al mostrar chat por correo: ${error}`);
        }
      }
    
      async listById(id) {
        try {
          return await Chat.findById(id);
        } catch (error) {
          throw new Error(`Error al mostrar el chat por IDs: ${error}`);
        }
      }
    
      async save(newElement) {
        try {
          return await Chat.create(newElement);
        } catch (error) {
          throw new Error(`Error al guardar el chat: ${error}`);
        }
      }
    
      async update(id, data) {
        try {
          return await Chat.findByIdAndUpdate(id, data);
        } catch (error) {
          throw new Error(`Error al actualizar el chat: ${error}`);
        }
      }
    
      async delete(id) {
        try {
          return await Message.findByIdAndDelete(id);
        } catch (error) {
          throw new Error(`Error al eliminar el chat: ${error}`);
        }
      }
}

export default new chatDao();
