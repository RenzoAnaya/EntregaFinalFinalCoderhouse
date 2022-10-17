import Products from '../models/productModel.js';
import User from '../models/userModel.js';
import ordersDao from '../DAO/orderDao.js'
import cartDao from '../DAO/cartDao.js';
import moment from 'moment';
import { checkOutEMail } from '../utils/email.js'

class orderController {
    async checkOut(req, res) {
        try {
          const user = await User.findById(req.user._id);
          let { email, fullname } = user;
          const cart = await cartDao.get(user);
          const { deliveryAddress } = req.body;
          const productsInCart = await Promise.all(
            cart.products.map(async (element) => {
              console.log(element);
              const product = await Products.findById(element.productId);
              return {
                product: product.name,
                description: product.description,
                price: product.price,
                quantity: element.quantity,
              };
            })
          );
          const newOrderData = {
            userName: fullname,
            products: productsInCart,
            userEmail: email,
            date: moment(new Date()).format('DD/MM/YY HH:mm'),
            state: 'Generada',
            deliveryAddress: deliveryAddress,
          };
          const newOrder = await ordersDao.create(newOrderData);
          checkOutEMail(newOrderData);
          await cartDao.delete(cart._id);
          res.status(200).json({ message: 'Orden creada', newOrder });
        } catch (error) {
          console.log(`Error al generar la orden. ${error}`);
          return res.status(500).json({ error_description: 'Server error.' });
        }
      }
    
      async getOrders(req, res) {
        try {
          const orders = await ordersDao.getAll();
    
          return res.status(200).json(orders);
        } catch (error) {
          console.log(`Error al buscar las órdenes. ${error}`);
          return res.status(500).json({ error_description: 'Server error.' });
        }
      }
}

export default new orderController();