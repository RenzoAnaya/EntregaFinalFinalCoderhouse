import Products from '../models/productModel.js';
import User from '../models/userModel.js';
import moment from 'moment';
import cartDao from '../DAO/cartDao.js';

class cartsController{
    async getCart(req, res) {
        try {
          const user = await User.findById(req.user._id);
          const cart = await cartDao.get(user);
          if (!cart)
            return res.status(404).json({ error_description: 'Carrito vacío' });
    
          const cartArray = await Promise.all(
            cart.products.map(async (element) => {
              return {
                product: await Products.findById(element.productId),
                quantity: element.quantity,
                id: element._id,
              };
            })
          );
          res.status(200).json(cartArray);
        } catch (error) {
          console.log(`Error al obtener carrito. ${error}`);
          return res.status(500).json({ error_description: 'Server error' });
        }
      }
    
      async addProductsToCart(req, res) {
        try {
          const user = await User.findById(req.user._id);
          const { productId, quantity } = req.body;
          const date = moment(new Date()).format('DD/MM/YY HH:mm');
          const cart = await cartDao.get(user);
          if (cart) {
            let productAlreadyInCart, indexOfProductAlreadyInCart;
    
            cart.products.forEach((product) => {
              if (product.productId === productId) {
                productAlreadyInCart = product;
              }
            });
            if (productAlreadyInCart) {
              indexOfProductAlreadyInCart =
                cart.products.indexOf(productAlreadyInCart);
              const newQuantity = productAlreadyInCart.quantity + quantity;
              cart.date = date;
              cart.products[indexOfProductAlreadyInCart].quantity = newQuantity;
              await cartDao.update(cart._id, cart);
              return res.status(200).json({ message: 'Agregado al carrito ', cart });
            }
    
            cart.products.push({ productId, quantity });
            cart.date = date;
            await cart.save();
            return res.status(200).json({ message: 'Agregado al carrito ', cart });
          }
    
          // Crear nuevo carrito
          const cartData = {
            userEmail: user.email,
            products: [{ productId, quantity }],
            date,
          };
          const newCart = await cartDao.create(cartData);
          res.status(200).json({ message: 'Agregado al carrito ', newCart });
        } catch (error) {
          console.log(`Error al obtener carrito. ${error}`);
          return res.status(500).json({ error_description: 'Error en el servidor.' });
        }
      }
    
      async updateCart(req, res) {
        try {
          const user = await User.findById(req.user._id);
          const date = moment(new Date()).format('DD/MM/YY HH:mm');
          const productId = req.params.id;
          const { quantity } = req.body;
    
          const cart = await cartDao.get(user);
          let isProductInCart;
          cart.products.forEach((product) => {
            if (product.productId === productId) isProductInCart = product;
          });
          if (!isProductInCart) {
            return res
              .status(400)
              .json({ error_description: 'Producto no encontrado' });
          }
          const indexOfProductToUpdate = cart.products.indexOf(isProductInCart);
          const newQuantity = quantity;
          cart.date = date;
          cart.products[indexOfProductToUpdate].quantity = newQuantity;
          await cartDao.update(cart._id, cart);
    
          res.status(200).json({ message: 'Producto actualizado', cart });
        } catch (error) {
          console.log(`Error al actualizar producto. ${error}`);
          return res.status(500).json({ error_description: 'Server error.' });
        }
      }
    
      async deleteCart(req, res) {
        try {
          const user = await User.findById(req.user._id);
          const cart = await cartDao.get(user);
          await cartDao.delete(cart._id);
          res.status(200).json({ message: 'Carrito eliminado' });
        } catch (error) {
          console.log(`Error. ${error}`);
          return res.status(500).json({ error_description: 'Server error.' });
        }
      }
}

export default new cartsController();