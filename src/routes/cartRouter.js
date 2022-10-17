import { Router } from "express";
import cartsController from '../controller/cartController.js'
import authToken from "../middleware/authToken.js";

const cartRouter = new Router();

export default (app)  =>{
    app.use('/cart', cartRouter);

    cartRouter.get('/', authToken, cartsController.getCart);
  
    cartRouter.post('/', authToken, cartsController.addProductsToCart);
  
    cartRouter.put('/:id', authToken, cartsController.updateCart);
  
    cartRouter.delete('/', authToken, cartsController.deleteCart);
}